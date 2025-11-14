// models/Brand.js (Đã SỬA)

const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: String
    }
}, { timestamps: true });

// Tạo và export Model 'Brand'
const Brand = mongoose.model('Brand', brandSchema); 
module.exports = Brand;

// *Lưu ý*: File Category.js của bạn cần phải riêng biệt và export Model Category.