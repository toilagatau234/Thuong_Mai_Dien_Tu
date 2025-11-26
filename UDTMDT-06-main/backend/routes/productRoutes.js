// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { protect: auth, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { 
    getAllProducts,     // Lấy danh sách sản phẩm (có filter, pagination)
    getProductById,  // Lấy chi tiết 1 sản phẩm theo id
    createProduct,      // Tạo sản phẩm mới
    updateProduct,
    deleteProduct,
} = require('../controllers/productController.js');

// --- PUBLIC ROUTES ---
router.get('/', getAllProducts);      // GET: /api/products → danh sách sản phẩm
router.get('/:id', getProductById); // GET: /api/products/:id → chi tiết sản phẩm

// --- ADMIN ROUTES ---

// Tạo sản phẩm (Cho phép upload tối đa 5 ảnh một lúc)
router.post('/', auth, adminOnly, upload.array('images', 10), createProduct);
router.put('/:id', auth, adminOnly, upload.array('images', 10), updateProduct);
router.delete('/:id', auth, adminOnly, deleteProduct);

module.exports = router;
