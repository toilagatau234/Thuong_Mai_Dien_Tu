const express = require('express');
const router = express.Router();

const { registerUser, loginUser, updateUser, forgotPassword, resetPassword } = require('../controllers/userController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.put('/user/update/:id', updateUser);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);

module.exports = router;