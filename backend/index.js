const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const addressRoutes = require('./routes/addressRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

// CORS configuration
const allowedOrigins = ['http://localhost:3000'];

// Enable CORS for all routes
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
});

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Đã kết nối tới MongoDB!'))
.catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/addresses', addressRoutes);

app.get('/', (req, res) => {
    res.send('✅ Máy chủ đang hoạt động!');
});

app.use((req, res) => {
    res.status(404).json({ message: '❌ Không tìm thấy tài nguyên' });
});

app.use((err, req, res, next) => {
    console.error('❌ Lỗi máy chủ:', err);
    res.status(500).json({ 
        message: '❌ Đã xảy ra lỗi máy chủ',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Máy chủ đang chạy tại http://localhost:${port}`);
});