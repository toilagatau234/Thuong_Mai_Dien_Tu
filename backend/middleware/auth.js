const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Lấy token từ header
            token = req.headers.authorization.split(' ')[1];
            console.log('Token nhận được:', token.substring(0, 20) + '...');
            console.log('JWT_SECRET:', process.env.JWT_SECRET);

            // Xác minh token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_beautycosmetic_2024');
            console.log('Token verified:', decoded);

            // Lấy thông tin user từ token
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error('JWT Error:', error.message);
            return res.status(401).json({ 
                success: false,
                message: 'Không được phép truy cập, token không hợp lệ: ' + error.message 
            });
        }
    } else if (!token) {
        return res.status(401).json({ 
            success: false,
            message: 'Không tìm thấy token, từ chối truy cập' 
        });
    }
};

module.exports = { protect };
