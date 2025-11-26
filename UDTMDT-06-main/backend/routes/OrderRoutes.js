const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { protect: auth, adminOnly} = require('../middleware/authMiddleware');

// 1. Tạo đơn hàng
router.post('/create', auth, OrderController.createOrder);

// 2. Lấy tất cả đơn của 1 user (Frontend truyền ID user vào URL)
router.get('/get-all-order/:id', auth, OrderController.getAllOrder);

// 3. Lấy chi tiết 1 đơn hàng
router.get('/get-details-order/:id', auth, OrderController.getDetailsOrder);

// 4. Hủy đơn hàng
router.delete('/cancel-order/:id', auth, OrderController.cancelOrderProduct);

// --- ADMIN ROUTES ---
// 1. Lấy tất cả đơn hàng
router.get('/all-orders', auth, adminOnly, OrderController.getAllOrdersSystem);

// 2. Cập nhật trạng thái
router.put('/status/:id', auth, adminOnly, OrderController.updateOrderStatus);

module.exports = router;