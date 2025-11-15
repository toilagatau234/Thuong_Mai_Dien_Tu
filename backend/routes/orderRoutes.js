const express = require('express');
const router = express.Router();
const moment = require('moment');
const config = require('config');
const qs = require('qs');
const crypto = require('crypto');
const Order = require('../models/Order'); // Import model Order

// Hàm sortObject (theo tài liệu VNPAY)
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

/**
 * @route   POST /api/orders/create_payment_url
 * @desc    Tạo đơn hàng mới và URL thanh toán VNPAY
 */
router.post('/create_payment_url', async (req, res) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');
    let vnpUrl = config.get('vnp_Url');
    let returnUrl = config.get('vnp_ReturnUrl');

    // Lấy dữ liệu từ body request (gửi từ PaymentPage.jsx)
    const { amount, bankCode, language, orderItems, shippingInfo } = req.body;
    
    // 1. Tạo đơn hàng và lưu vào cơ sở dữ liệu (status: 'pending')
    let orderId_vnp = moment(date).format('DDHHmmss'); // Mã đơn hàng tạm thời
    
    const newOrder = new Order({
        shippingInfo: shippingInfo,
        orderItems: orderItems,
        totalPrice: amount,
        paymentMethod: 'vnpay',
        paymentStatus: 'pending', // Trạng thái chờ thanh toán
        orderId_vnp: orderId_vnp 
    });

    try {
        const savedOrder = await newOrder.save();
        
        // 2. Tạo các tham số VNPAY
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0'; // [cite: 2722, 2723, 3823]
        vnp_Params['vnp_Command'] = 'pay'; // [cite: 2727, 2728, 3811]
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = language || 'vn'; // [cite: 2752, 2753, 3818]
        vnp_Params['vnp_CurrCode'] = 'VND'; // [cite: 2757, 2758, 3816]
        
        // Sử dụng _id của đơn hàng làm mã tham chiếu (vnp_TxnRef)
        // Đây là cách chúng ta tìm lại đơn hàng khi VNPAY gọi về
        vnp_Params['vnp_TxnRef'] = savedOrder._id.toString(); // [cite: 2763, 2764, 3822]
        savedOrder.vnp_TxnRef = savedOrder._id.toString(); // Lưu lại vào đơn hàng để tham chiếu
        await savedOrder.save();

        vnp_Params['vnp_OrderInfo'] = 'Thanh toan don hang ' + savedOrder._id.toString(); // [cite: 2770, 3819]
        vnp_Params['vnp_OrderType'] = 'other'; // [cite: 2776, 2777, 3820]
        vnp_Params['vnp_Amount'] = amount * 100; // VNPAY yêu cầu nhân 100 [cite: 2787, 2789, 3805]
        vnp_Params['vnp_ReturnUrl'] = returnUrl; // [cite: 2791, 2794, 3821]
        vnp_Params['vnp_IpAddr'] = ipAddr; // [cite: 2801, 2802, 3817]
        vnp_Params['vnp_CreateDate'] = createDate; // [cite: 2805, 2808, 2809, 3812]

        if (bankCode) {
            vnp_Params['vnp_BankCode'] = bankCode; // [cite: 2743, 2744]
        }

        // 3. Tạo chữ ký (Secure Hash)
        vnp_Params = sortObject(vnp_Params);
        let signData = qs.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed; // [cite: 2926, 2927]

        // 4. Tạo URL thanh toán
        vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });

        // 5. Trả URL về cho frontend
        res.status(200).json({ paymentUrl: vnpUrl });

    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng hoặc URL VNPAY:', error);
        res.status(500).json({ message: 'Lỗi máy chủ khi tạo thanh toán.' });
    }
});

/**
 * @route   GET /api/orders/vnpay_return
 * @desc    Xử lý khi VNPAY chuyển hướng người dùng về
 */
router.get('/vnpay_return', async (req, res) => {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];

    // Xóa các tham số hash để kiểm tra chữ ký
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let secretKey = config.get('vnp_HashSecret');
    let signData = qs.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

    // Lấy các tham số VNPAY trả về
    const orderId = vnp_Params['vnp_TxnRef']; // Đây là _id của đơn hàng
    const responseCode = vnp_Params['vnp_ResponseCode']; // [cite: 2961, 2962]
    const transactionStatus = vnp_Params['vnp_TransactionStatus']; // [cite: 2996, 2997]
    
    // URL để redirect về frontend (React App)
    // Chúng ta sẽ gửi lại tất cả tham số VNPAY về cho trang React xử lý
    const redirectUrl = `http://localhost:3000/vnpay_return?${qs.stringify(vnp_Params, { encode: false })}`;

    if (secureHash === signed) {
        try {
            // 1. Tìm đơn hàng bằng _id (orderId)
            const order = await Order.findById(orderId);

            if (order) {
                // 2. Kiểm tra trạng thái thanh toán
                if (responseCode === '00' && transactionStatus === '00') {
                    // Cập nhật trạng thái đơn hàng thành 'success' (đã thanh toán)
                    order.paymentStatus = 'success'; // [cite: 3715]
                    await order.save();
                    
                    // TODO: Xóa sản phẩm khỏi giỏ hàng (logic này nên được xử lý ở frontend khi nhận kết quả thành công)
                    
                } else {
                    // Thanh toán thất bại hoặc bị hủy
                    order.paymentStatus = 'failed';
                    await order.save();
                }
                
                // 3. Chuyển hướng về trang React với kết quả
                res.redirect(redirectUrl);

            } else {
                // Không tìm thấy đơn hàng
                // Chuyển hướng về React với mã lỗi "không tìm thấy"
                res.redirect(`http://localhost:3000/vnpay_return?vnp_ResponseCode=97`);
            }
        } catch (error) {
            console.error("Lỗi cập nhật đơn hàng sau khi VNPAY return:", error);
            // Chuyển hướng về React với mã lỗi hệ thống
            res.redirect(`http://localhost:3000/vnpay_return?vnp_ResponseCode=99`);
        }
    } else {
        // Sai chữ ký
        res.redirect(`http://localhost:3000/vnpay_return?vnp_ResponseCode=97`);
    }
});

/**
 * @route   GET /api/orders/status/:orderId
 * @desc    Kiểm tra trạng thái thanh toán của đơn hàng từ DB
 */
router.get('/status/:orderId', async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
        }
        res.status(200).json({ 
            paymentStatus: order.paymentStatus,
            orderId: order._id
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn trạng thái đơn hàng:", error);
        res.status(500).json({ message: 'Lỗi máy chủ khi truy vấn trạng thái đơn hàng.' });
    }
});


module.exports = router;