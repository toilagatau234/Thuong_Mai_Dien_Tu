const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user: { // Thêm trường này để biết Admin nào tạo (quan trọng cho Controller)
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true
    },
    images: [ // Sửa thành mảng chuỗi để lưu đường dẫn ảnh
        { type: String }
    ],
    brand: {
        type: String
    },
    category: { // Giữ lại cái này (Ref), xóa cái String ở trên
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String
    },
    price: { // Giá bán
        type: Number,
        required: true,
        default: 0
    },
    originalPrice: { // Giá gốc (nếu có)
        type: Number,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;