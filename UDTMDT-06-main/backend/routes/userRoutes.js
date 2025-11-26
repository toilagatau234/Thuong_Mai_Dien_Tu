const express = require('express');
const router = express.Router();
const { protect: auth , authUserMiddleware} = require('../middleware/authMiddleware.js');
const {userController} = require('../controllers/userController.js');

const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    forgotPassword,
    resetPassword,
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    addAddress,
    updateAddress,
    removeAddress,
    updateCart,
    getCart
} = require('../controllers/userController');

// --- KHÔNG CẦN ĐĂNG NHẬP ---
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// --- CẦN ĐĂNG NHẬP (PROFILE) ---
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfile);

// --- QUẢN LÝ ĐỊA CHỈ ---
router.post('/address', auth, addAddress);
router.put('/address/:id', auth, updateAddress);
router.delete('/address/:id', auth, removeAddress);

// --- WISHLIST ---
router.get('/wishlist', auth, getWishlist);
router.post('/add-wishlist', auth, addToWishlist); 
router.delete('/wishlist/:productId', auth, removeFromWishlist);

// --- GIỎ HÀNG ---
router.put('/update-cart', auth, updateCart);
router.get('/get-cart', auth, getCart);

// --- Admin ---
router.get('/getAll', auth, authUserMiddleware, userController.getAllUsers);
router.delete('/delete-user/:id', auth, authUserMiddleware, userController.deleteUser);
router.put('/update-user/:id', auth, authUserMiddleware, userController.updateUserByAdmin);

module.exports = router;