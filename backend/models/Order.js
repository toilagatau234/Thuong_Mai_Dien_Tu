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

const orderSchema = new mongoose.Schema({
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Thêm khi bạn tích hợp đăng nhập
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
    paymentStatus: { // Trạng thái: 'pending', 'success', 'failed'
        type: String,
        required: true,
        default: 'pending' 
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    vnp_TxnRef: { // Lưu _id của đơn hàng để VNPAY tham chiếu
       type: String
    },
    vnp_TransactionNo: { // Mã giao dịch từ VNPAY (lưu lại khi IPN gọi về)
        type: String,
        default: '0'
    }
}, {
    timestamps: true 
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;