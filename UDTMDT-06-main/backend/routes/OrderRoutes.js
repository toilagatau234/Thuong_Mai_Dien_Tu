const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { protect } = require('../middleware/authMiddleware');

// 1. Tạo đơn hàng
router.post('/create', protect, OrderController.createOrder);

// 2. Lấy tất cả đơn của 1 user (Frontend truyền ID user vào URL)
router.get('/get-all-order/:id', protect, OrderController.getAllOrder);

// 3. Lấy chi tiết 1 đơn hàng
router.get('/get-details-order/:id', protect, OrderController.getDetailsOrder);

// 4. Hủy đơn hàng
router.delete('/cancel-order/:id', protect, OrderController.cancelOrderProduct);

module.exports = router;