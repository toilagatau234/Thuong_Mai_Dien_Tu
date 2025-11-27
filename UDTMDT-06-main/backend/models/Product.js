const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    name: {
        type: String,
        required: true
    },
    images: [
        { 
            url: { type: String, required: true },
            _id: false // Không tạo ID phụ cho từng ảnh
        }
    ],
    brand: {
        type: String
    },
    category: { // Giữ lại cái này (Ref), xóa cái String ở trên
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category'
    },
    description: {
        type: String
    },
    price: { // Giá bán
        type: Number,
        default: 0
    },
    originalPrice: { // Giá gốc (nếu có)
        type: Number,
        default: 0
    },
    countInStock: {
        type: Number, 
        default: 0
    },
    variations: [
        {
            color: String,
            size: String,
            price: Number,
            stock: Number, // JSON cũ dùng 'stock' hay 'quantity'? Kiểm tra JSON thấy có cả hai, ta nên map
            image: String
        }
    ],
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