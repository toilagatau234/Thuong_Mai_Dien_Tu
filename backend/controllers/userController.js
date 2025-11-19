// backend/controllers/userController.js

const User = require('../models/User.js');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// --- REGISTER USER ---
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email đã tồn tại' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// --- LOGIN USER ---
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Email không tồn tại' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Mật khẩu không chính xác' });

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET || 'your_jwt_secret_key_beautycosmetic_2024',
            { expiresIn: '1d' }
        );

        const { password: userPassword, ...userData } = user.toObject();
        res.status(200).json({ message: 'Đăng nhập thành công!', token, user: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// --- GET USER PROFILE ---
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

// --- UPDATE USER PROFILE ---
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });

        // Cập nhật các trường cho phép
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = ''; // Xóa lastName
        user.phone = req.body.phone || user.phone;
        user.gender = req.body.gender || user.gender;
        
        // Xử lý birthday - chỉ cập nhật nếu có giá trị
        if (req.body.birthday) {
            user.birthday = new Date(req.body.birthday);
        }

        const updatedUser = await user.save();
        const { password, ...userData } = updatedUser.toObject();

        res.status(200).json({ success: true, message: 'Cập nhật thông tin thành công!', data: userData });
    } catch (error) {
        console.error('Update user profile error:', error);
        res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
};

// --- FORGOT PASSWORD ---
const forgotPassword = async (req, res) => {
    // (Giữ nguyên code)
};

// --- RESET PASSWORD ---
const resetPassword = async (req, res) => {
    // (Giữ nguyên code)
};

// --- WISHLIST ---
const getWishlist = async (req, res) => {
    // (Giữ nguyên code)
};

const addToWishlist = async (req, res) => {
    // (Giữ nguyên code)
};

const removeFromWishlist = async (req, res) => {
    // (Giữ nguyên code)
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    forgotPassword,
    resetPassword,
    getWishlist,
    addToWishlist,
    removeFromWishlist
};
