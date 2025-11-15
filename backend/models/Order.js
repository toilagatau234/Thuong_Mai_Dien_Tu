const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Product' 
    }
});

// Định nghĩa schema cho đơn hàng chính
const orderSchema = new mongoose.Schema({
    // Bạn có thể thêm user ID nếu hệ thống có đăng nhập
    // user: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     required: true, 
    //     ref: 'User' 
    // },
    shippingInfo: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        note: { type: String }
    },
    orderItems: [orderItemSchema],
    paymentMethod: {
        type: String,
        required: true,
        default: 'cod'
    },
    paymentStatus: { // Trạng thái thanh toán: pending, success, failed
        type: String,
        required: true,
        default: 'pending' 
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderId_vnp: { // Dùng để lưu mã DDHHmmss khi tạo
        type: String, 
        required: true
    },
    vnp_TxnRef: { // Dùng để lưu mã _id của đơn hàng, gửi qua VNPAY
       type: String
    }
}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;