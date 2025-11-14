const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: { type: Array, required: true },
    category: { type: String },
    brand: { type: String },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    stockQuantity: { type: Number, required: true },
    description: { type: String },
    slug: { type: String },
    sku: { type: String },
    status: { type: String, default: 'in_stock' },
    isOnSale: { type: Boolean, default: false },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;