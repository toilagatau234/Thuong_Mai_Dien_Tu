import React, { useEffect, useState } from 'react';
import apiService from '../../services/apiService'; // Import apiService của bạn
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        orders: 0,
        revenue: 0,
        chartData: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await apiService.getDashboardStats();
                if (res?.status === 'OK') {
                    setStats(res.data);
                }
            } catch (error) {
                console.error("Lỗi tải thống kê:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="p-4">Đang tải dữ liệu...</div>;

    return (
        <div className="container-fluid p-4">
            <h2 className="mb-4">Tổng quan hệ thống</h2>
            
            {/* Phần 1: Các thẻ Card thống kê */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card text-white bg-primary mb-3" style={{height: '150px'}}>
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <h5 className="card-title">Người dùng</h5>
                            <h2 className="card-text">{stats.users}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-success mb-3" style={{height: '150px'}}>
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <h5 className="card-title">Sản phẩm</h5>
                            <h2 className="card-text">{stats.products}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-warning mb-3" style={{height: '150px'}}>
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <h5 className="card-title">Đơn hàng</h5>
                            <h2 className="card-text">{stats.orders}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-danger mb-3" style={{height: '150px'}}>
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <h5 className="card-title">Doanh thu</h5>
                            <h2 className="card-text">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.revenue)}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phần 2: Biểu đồ doanh thu */}
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">Biểu đồ doanh thu năm nay</h5>
                        </div>
                        <div className="card-body" style={{ height: '400px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={stats.chartData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)} />
                                    <Legend />
                                    <Bar dataKey="revenue" name="Doanh thu" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;