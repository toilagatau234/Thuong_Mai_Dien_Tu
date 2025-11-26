const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/DashboardController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

router.get('/stats', authMiddleware, authUserMiddleware, DashboardController.getDashboardStats);

module.exports = router;