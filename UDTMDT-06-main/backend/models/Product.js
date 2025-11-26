// models/Product.js
const mongoose = require('mongoose');

// --- SCHEMA SẢN PHẨM ---
const productSchema = new mongoose.Schema({
    name: {              // Tên sản phẩm
        type: String,
        required: true,
        trim: true
    },
    images: [
        { type: String } 
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    brand: {             // ID hoặc tên thương hiệu
        type: String
    },
    price: {             // Giá gốc
        type: Number,
        required: true
    },
    salePrice: {         // Giá sale (nếu có)
        type: Number
    },
    stockQuantity: {     // Số lượng trong kho
        type: Number,
        required: true
    },
    description: {       // Mô tả sản phẩm
        type: String
    },
    slug: {              // Slug dùng URL
        type: String
    },
    sku: {               // Mã sản phẩm
        type: String
    },
    status: {            // Trạng thái: in_stock, out_of_stock
        type: String,
        default: 'in_stock'
    },
    isOnSale: {          // Có đang sale hay không
        type: Boolean,
        default: false
    },
    // Các trường bổ sung khác (giữ nguyên nếu muốn dùng sau này)
    // rating: {
    //     type: Number,
    //     default: 0
    // },
    // numReviews: {
    //     type: Number,
    //     default: 0
    // },
    // sold: {             // Số lượng đã bán
    //     type: Number,
    //     default: 0
    // }
}, { timestamps: true }); // createdAt, updatedAt tự động

// --- TẠO VÀ EXPORT MODEL 'Product' ---
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
