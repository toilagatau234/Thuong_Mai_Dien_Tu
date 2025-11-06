import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import api from '../services/api.js';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các thành phần của ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Logic này lấy từ Admin/src/controllers/DashboardController.js
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Gọi API thống kê
        const response = await api.get('/product/statistical'); // (Endpoint này từ server/routes/product.js)
        
        if (response.data) {
          const data = response.data;
          setStats({
            totalUsers: data.totalUser || 0,
            totalProducts: data.totalProduct || 0,
            totalOrders: data.totalBill || 0,
            totalRevenue: data.totalRevenue || 0,
          });

          // Chuẩn bị data cho biểu đồ
          // (Logic này dựa trên DashboardController.js của bạn)
          const labels = data.revenueByMonth.map(item => `Tháng ${item._id.month}/${item._id.year}`);
          const revenueData = data.revenueByMonth.map(item => item.totalRevenue);
          
          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'Doanh thu (VND)',
                data: revenueData,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
              },
            ],
          });
        }
      } catch (error) {
        console.error("Lỗi khi tải dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // [] nghĩa là chỉ chạy 1 lần khi component tải

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Doanh thu hàng tháng',
      },
    },
  };

  // Giao diện (HTML) lấy từ Admin/src/pages/dashboard.html
  return (
    <>
      <h1 className="h3 mb-3">Dashboard</h1>
      
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <>
          <Row>
            {/* Thẻ Total User */}
            <Col md={6} xl={3}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>Người dùng</Card.Title>
                      <h1 className="mt-1 mb-3">{stats.totalUsers}</h1>
                    </Col>
                    <Col xs="auto">
                      <div className="stat text-primary">
                        <i className="fa-solid fa-users"></i>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Thẻ Total Product */}
            <Col md={6} xl={3}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>Sản phẩm</Card.Title>
                      <h1 className="mt-1 mb-3">{stats.totalProducts}</h1>
                    </Col>
                    <Col xs="auto">
                      <div className="stat text-primary">
                        <i className="fa-solid fa-box-open"></i>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Thẻ Total Order */}
            <Col md={6} xl={3}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>Đơn hàng</Card.Title>
                      <h1 className="mt-1 mb-3">{stats.totalOrders}</h1>
                    </Col>
                    <Col xs="auto">
                      <div className="stat text-primary">
                        <i className="fa-solid fa-receipt"></i>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Thẻ Total Revenue */}
            <Col md={6} xl={3}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>Doanh thu</Card.Title>
                      <h1 className="mt-1 mb-3">{stats.totalRevenue.toLocaleString('vi-VN')} đ</h1>
                    </Col>
                    <Col xs="auto">
                      <div className="stat text-primary">
                        <i className="fa-solid fa-dollar-sign"></i>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {/* Biểu đồ */}
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title>Thống kê doanh thu</Card.Title>
                </Card.Header>
                <Card.Body>
                  {chartData ? (
                    <Bar options={chartOptions} data={chartData} />
                  ) : (
                    <p>Không có dữ liệu biểu đồ.</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Dashboard;