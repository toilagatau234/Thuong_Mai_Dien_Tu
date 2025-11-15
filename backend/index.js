const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes.js'); 
const productRoutes = require('./routes/productRoutes.js'); 
const orderRoutes = require('./routes/orderRoutes.js'); 


dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors()); 
app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB!'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/api', userRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/orders', orderRoutes)

app.listen(port, () => {
    console.log(`Server chắc chắn đang chạy trên 127.0.0.1:${port}`);
});