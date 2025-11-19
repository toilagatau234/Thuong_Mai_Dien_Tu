const express = require('express');
const router = express.Router();
const { protect: auth } = require('../middleware/auth.js');

const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    forgotPassword,
    resetPassword,
    getWishlist,
    addToWishlist,
    removeFromWishlist
} = require('../controllers/userController');

// Các route không cần đăng nhập
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Các route cần đăng nhập
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfile);

router.get('/wishlist', auth, getWishlist);
router.post('/wishlist', auth, addToWishlist);
router.delete('/wishlist/:productId', auth, removeFromWishlist);

module.exports = router;
