const User = require('../models/User.js');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: password,
        });
        await newUser.save();
        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email không tồn tại' });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: 'Mật khẩu không chính xác' });
        }
        const token = "DUMMY_TOKEN";
        const { password: userPassword, ...userData } = user.toObject();
        res.status(200).json({
            message: 'Đăng nhập thành công!',
            token: token,
            user: userData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { firstName, lastName } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                firstName: firstName,
                lastName: lastName,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Không tìm thấy user' });
        }

        const { password, ...userData } = updatedUser.toObject();

        res.status(200).json({
            message: 'Cập nhật thành công!',
            user: userData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ message: 'Nếu email tồn tại, link khôi phục đã được gửi.' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Khôi phục mật khẩu BeautyCosmetic',
            html: `
                <p>Bạn (hoặc ai đó) đã yêu cầu khôi phục mật khẩu. Nhấp vào:</p>
                <a href="${resetUrl}">Đường dẫn khôi phục mật khẩu</a>
                <p>Đường dẫn này sẽ hết hạn sau 1 giờ.</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Nếu email tồn tại, link khôi phục đã được gửi.' });
    } catch (error) {
        console.error("Lỗi gửi email hoặc tạo token:", error);
        res.status(500).json({ message: 'Lỗi máy chủ khi xử lý yêu cầu.' });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Link không hợp lệ hoặc đã hết hạn.' });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Mật khẩu đã được cập nhật thành công.' });
    } catch (error) {
        console.error("Lỗi đặt lại mật khẩu:", error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    forgotPassword,
    resetPassword
};
