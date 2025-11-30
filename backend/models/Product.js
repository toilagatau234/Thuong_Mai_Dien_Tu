const mongoose = require('mongoose');

// 1. Tạo Schema riêng cho từng review
const reviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        }
    },
    { timestamps: true }
);

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: { type: Array, required: true, default: [] }, 
    image: { type: String }, // Giữ lại để tương thích nếu code cũ dùng cái này
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    brand: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Brand' 
    },
    
    // --- PHẦN QUAN TRỌNG: REVIEW ---
    reviews: [reviewSchema], // Mảng chứa chi tiết các đánh giá
    rating: { type: Number, required: true, default: 0 }, // Điểm trung bình (VD: 4.5)
    numReviews: { type: Number, required: true, default: 0 }, // Tổng số lượng đánh giá
    // -------------------------------

    price: { type: Number, required: true, default: 0 },
    salePrice: { type: Number, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String },
    slug: { type: String },
    status: { type: String, default: 'in_stock' },
    isFlashSale: { type: Boolean, default: false },
    flashSalePrice: { type: Number, default: 0 },
    type: { type: String }, // Thêm trường này nếu cần phân loại nhanh

    variations: [
        {
            color: { type: String },
            size: { type: String },
            quantity: { type: Number, default: 0 },
            price: { type: Number, default: 0 }
        }
    ],
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
    
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;