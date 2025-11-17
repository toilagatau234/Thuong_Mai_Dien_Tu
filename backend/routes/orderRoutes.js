const express = require('express');
const router = express.Router();
const moment = require('moment');
const config = require('config');
const qs = require('qs');
const crypto = require('crypto');
const Order = require('../models/Order'); // Import model Order

// Hàm sortObject (lấy từ demo vnpay_nodejs)
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
 * @desc    Tạo đơn hàng mới (pending) và URL VNPAY
 */
router.post('/create_payment_url', async (req, res) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);

    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');
    let vnpUrl = config.get('vnp_Url');
    let returnUrl = config.get('vnp_ReturnUrl');
    let ipnUrl = config.get('vnp_IpnUrl'); // Lấy IPN URL từ config

    const { amount, language, orderItems, shippingInfo } = req.body;
    
    // 1. Tạo đơn hàng và lưu vào DB
    const newOrder = new Order({
        shippingInfo: shippingInfo,
        orderItems: orderItems,
        totalPrice: amount,
        paymentMethod: 'vnpay',
        paymentStatus: 'pending', 
    });

    try {
        const savedOrder = await newOrder.save();
        
        // 2. Tạo các tham số VNPAY
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = language || 'vn';
        vnp_Params['vnp_CurrCode'] = 'VND';
        
        // Sử dụng _id của đơn hàng làm mã tham chiếu
        vnp_Params['vnp_TxnRef'] = savedOrder._id.toString();
        savedOrder.vnp_TxnRef = savedOrder._id.toString(); 
        await savedOrder.save();

        vnp_Params['vnp_OrderInfo'] = 'Thanh toan don hang ' + savedOrder._id.toString();
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpnUrl'] = ipnUrl; 
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        
        // 3. Tạo chữ ký
        vnp_Params = sortObject(vnp_Params);
        let signData = qs.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;

        // 4. Tạo URL thanh toán
        vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });

        // 5. Trả URL về cho frontend
        res.status(200).json({ paymentUrl: vnpUrl });

    } catch (error) {
        console.error('Lỗi khi tạo URL VNPAY:', error);
        res.status(500).json({ message: 'Lỗi máy chủ khi tạo thanh toán.' });
    }
});

/**
 * @route   GET /api/orders/vnpay_return
 * @desc    Xử lý khi VNPAY chuyển hướng NGƯỜI DÙNG về.
 * CHỈ kiểm tra hash và redirect về Frontend. KHÔNG CẬP NHẬT DATABASE.
 */
router.get('/vnpay_return', function (req, res, next) {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let secretKey = config.get('vnp_HashSecret');
    let signData = qs.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");

    // URL redirect về React App
    const frontendReturnUrl = `http://localhost:3000/vnpay_return`;

    if (secureHash === signed) {
        // Chuyển hướng về trang React với đầy đủ tham số
        res.redirect(`${frontendReturnUrl}?${qs.stringify(vnp_Params, { encode: false })}`);
    } else {
        // Chuyển hướng về trang React với mã lỗi '97' (sai chữ ký)
        res.redirect(`${frontendReturnUrl}?vnp_ResponseCode=97`);
    }
});

/**
 * @route   GET /api/orders/vnpay_ipn
 * @desc    Xử lý khi VNPAY gọi (SERVER-TO-SERVER)
 * Đây là nơi an toàn để CẬP NHẬT DATABASE.
 */
router.get('/vnpay_ipn', async function (req, res, next) {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];

    let orderId = vnp_Params['vnp_TxnRef'];
    let rspCode = vnp_Params['vnp_ResponseCode'];
    let vnpTransactionNo = vnp_Params['vnp_TransactionNo'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    
    let secretKey = config.get('vnp_HashSecret');
    let signData = qs.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");

    try {
        // Tìm đơn hàng
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(200).json({ RspCode: '01', Message: 'Order not found' });
        }
        
        // Kiểm tra chữ ký
        if (secureHash === signed) {
            // Kiểm tra trạng thái đơn hàng (chỉ cập nhật nếu đang 'pending')
            if (order.paymentStatus === 'pending') {
                if (rspCode === '00') {
                    // Thanh toán thành công
                    order.paymentStatus = 'success';
                    order.vnp_TransactionNo = vnpTransactionNo; // Lưu mã GD VNPAY
                    await order.save();
                    
                    // TODO: Gửi email, trừ kho, v.v...
                    
                    return res.status(200).json({ RspCode: '00', Message: 'Success' });
                } else {
                    // Thanh toán thất bại
                    order.paymentStatus = 'failed';
                    await order.save();
                    return res.status(200).json({ RspCode: '00', Message: 'Success' });
                }
            } else {
                // Đơn hàng này đã được xử lý trước đó (có thể do VNPAY gọi IPN nhiều lần)
                return res.status(200).json({ RspCode: '02', Message: 'Order already confirmed' });
            }
        } else {
            // Sai chữ ký
            return res.status(200).json({ RspCode: '97', Message: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Lỗi xử lý IPN:', error);
        return res.status(200).json({ RspCode: '99', Message: 'Unknown error' });
    }
});

module.exports = router;