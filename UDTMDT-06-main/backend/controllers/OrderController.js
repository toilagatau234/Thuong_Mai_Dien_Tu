const Order = require('../models/OrderProduct');

// --- HÀM 1: createOrder (ĐÃ SỬA LỖI VALIDATION) ---
const createOrder = async (req, res) => {
    try {
        const { 
            paymentMethod, 
            itemsPrice, 
            shippingPrice, 
            totalPrice, 
            user,
            isPaid, 
            paidAt,
            // Nếu Frontend gửi rời rạc thì lấy ở đây
            fullName, address, city, phone 
        } = req.body;

        // === XỬ LÝ QUAN TRỌNG: Tự động bắt lấy shippingAddress ===
        // Nếu Frontend gửi gói 'shippingAddress' thì dùng nó.
        // Nếu Frontend gửi rời rạc thì tự gom lại.
        const shippingAddress = req.body.shippingAddress ? req.body.shippingAddress : {
            fullName,
            address,
            city,
            phone
        };
        // ========================================================

        if (!req.body.orderItems || req.body.orderItems.length === 0) {
            return res.status(400).json({ status: 'ERR', message: 'Giỏ hàng rỗng' });
        }

        const newOrder = await Order.create({
            orderItems: req.body.orderItems,
            shippingAddress, // Truyền biến đã xử lý vào đây
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            user: user || null,
            isPaid: isPaid || false,
            paidAt: paidAt || null
        });

        return res.status(200).json({
            status: 'OK',
            message: 'Tạo đơn hàng thành công',
            data: newOrder
        });
    } catch (e) {
        console.error("Lỗi tạo đơn:", e);
        return res.status(500).json({
            status: 'ERR',
            message: 'Lỗi server khi tạo đơn hàng',
            error: e.message
        });
    }
};

// --- HÀM 2: getAllOrder (Chuẩn) ---
const getAllOrder = async (req, res) => {
    try {
        const userId = req.params.id; 
        if (!userId) {
             return res.status(400).json({ status: 'ERR', message: 'Thiếu User ID' });
        }
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        return res.status(200).json({
            status: 'OK',
            data: orders
        });
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Lỗi lấy danh sách đơn hàng',
            error: e.message
        });
    }
};

// --- HÀM 3: getDetailsOrder (Chuẩn) ---
const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
             return res.status(400).json({ status: 'ERR', message: 'Thiếu Order ID' });
        }
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ status: 'ERR', message: 'Không tìm thấy đơn hàng' });
        }
        return res.status(200).json({
            status: 'OK',
            data: order
        });
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Lỗi lấy chi tiết đơn hàng',
            error: e.message
        });
    }
};

// --- HÀM 4: cancelOrderProduct (Chuẩn) ---
const cancelOrderProduct = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(400).json({ status: 'ERR', message: 'Thiếu Order ID' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            { isCancelled: true }, // Lưu ý: Model phải có trường này nếu muốn lưu
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ status: 'ERR', message: 'Không tìm thấy đơn hàng' });
        }

        return res.status(200).json({
            status: 'OK',
            message: 'Hủy đơn hàng thành công',
            data: updatedOrder
        });
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Lỗi hủy đơn hàng',
            error: e.message
        });
    }
};

module.exports = { 
    createOrder,
    getAllOrder,
    getDetailsOrder,
    cancelOrderProduct
};