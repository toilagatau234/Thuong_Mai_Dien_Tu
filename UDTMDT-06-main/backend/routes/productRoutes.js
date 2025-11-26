// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getAllProducts,    // Lấy danh sách sản phẩm (có filter, pagination)
    getProductDetails  // Lấy chi tiết 1 sản phẩm theo id
} = require('../controllers/productController.js');

// --- ROUTES ---
router.get('/', getAllProducts);      // GET: /api/products → danh sách sản phẩm
router.get('/:id', getProductDetails); // GET: /api/products/:id → chi tiết sản phẩm

module.exports = router;
