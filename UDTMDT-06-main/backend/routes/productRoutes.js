const express = require('express');
const router = express.Router();
const { protect: auth, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); 

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// --- PUBLIC ROUTES ---
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// --- ADMIN ROUTES (Cần thiết để sửa lỗi 404) ---
router.post('/', auth, adminOnly, upload.array('images', 10), createProduct);
router.put('/:id', auth, adminOnly, upload.array('images', 10), updateProduct);
router.delete('/:id', auth, adminOnly, deleteProduct);

module.exports = router;