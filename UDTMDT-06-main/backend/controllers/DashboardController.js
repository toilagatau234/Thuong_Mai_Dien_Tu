const Order = require('../models/OrderProduct');
const Product = require('../models/Product');
const User = require('../models/User');

// API lấy thống kê tổng quan
const getDashboardStats = async (req, res) => {
    try {
        // Đếm tổng số lượng
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        // Tính tổng doanh thu
        // Nếu muốn tính tất cả đơn thì bỏ match isPaid: true đi
        const totalRevenueData = await Order.aggregate([
            { $match: { isPaid: true } }, 
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);
        const totalRevenue = totalRevenueData.length > 0 ? totalRevenueData[0].total : 0;

        // Thống kê doanh thu theo tháng
        // Lấy dữ liệu 12 tháng gần nhất hoặc theo năm hiện tại
        const currentYear = new Date().getFullYear();
        const monthlyRevenue = await Order.aggregate([
            {
                $match: {
                    isPaid: true,
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lte: new Date(`${currentYear}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    total: { $sum: "$totalPrice" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Format lại dữ liệu cho Frontend (mảng 12 tháng, mặc định set = 0)
        const finalMonthlyData = [];
        for (let i = 1; i <= 12; i++) {
            const found = monthlyRevenue.find(item => item._id === i);
            finalMonthlyData.push({
                month: `Tháng ${i}`,
                revenue: found ? found.total : 0
            });
        }

        res.status(200).json({
            status: 'OK',
            data: {
                users: totalUsers,
                products: totalProducts,
                orders: totalOrders,
                revenue: totalRevenue,
                chartData: finalMonthlyData
            }
        });

    } catch (error) {
        res.status(500).json({ status: 'ERR', message: error.message });
    }
};

module.exports = { getDashboardStats };