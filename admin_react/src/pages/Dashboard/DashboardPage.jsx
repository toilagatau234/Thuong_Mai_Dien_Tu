import React, { useState, useEffect } from 'react';
import { getApi } from '../../services/apiService'; // Import hàm gọi API

const DashboardPage = () => {
  // Dùng useState để lưu trữ dữ liệu
  const [stats, setStats] = useState({
    totalProduct: 0,
    totalOrder: 0,
    totalUser: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dùng useEffect để tải dữ liệu
  // Nó sẽ chạy 1 lần khi trang được tải
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Thay thế các URL này bằng URL API thực tế của bạn
        const productRes = await getApi('/product/getAll?limit=1'); // Lấy tổng số SP
        const orderRes = await getApi('/order/getAll?limit=1');     // Lấy tổng số ĐH
        const userRes = await getApi('/user/getAll?limit=1');      // Lấy tổng số User
        // const revenueRes = await getApi('/statistical/revenue'); // Lấy doanh thu

        // Giả sử API trả về có trường 'total' hoặc 'count'
        setStats({
          totalProduct: productRes.data.total || 0,
          totalOrder: orderRes.data.total || 0,
          totalUser: userRes.data.total || 0,
          totalRevenue: 0, // Cập nhật từ revenueRes
        });
        
      } catch (err) {
        setError("Không thể tải dữ liệu Dashboard.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []); // [] rỗng nghĩa là chỉ chạy 1 lần


  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }
  
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Welcome Admin!</h3>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-body">
              <div className="dash-widget-header">
                <span className="dash-widget-icon text-primary border-primary">
                  <i className="fas fa-box"></i>
                </span>
                <div className="dash-count">
                  {/* GHI CHÚ: ng-bind -> {stats.totalProduct} */}
                  <h3>{stats.totalProduct}</h3>
                </div>
              </div>
              <div className="dash-widget-info">
                <h6 className="text-muted">Sản phẩm</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-body">
              <div className="dash-widget-header">
                <span className="dash-widget-icon text-success">
                  <i className="fas fa-shopping-cart"></i>
                </span>
                <div className="dash-count">
                  <h3>{stats.totalOrder}</h3>
                </div>
              </div>
              <div className="dash-widget-info">
                <h6 className="text-muted">Đơn hàng</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-body">
              <div className="dash-widget-header">
                <span className="dash-widget-icon text-danger border-danger">
                  <i className="fas fa-users"></i>
                </span>
                <div className="dash-count">
                  <h3>{stats.totalUser}</h3>
                </div>
              </div>
              <div className="dash-widget-info">
                <h6 className="text-muted">Khách hàng</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-body">
              <div className="dash-widget-header">
                <span className="dash-widget-icon text-warning border-warning">
                  <i className="fas fa-dollar-sign"></i>
                </span>
                <div className="dash-count">
                  {/* Cần format tiền tệ */}
                  <h3>{stats.totalRevenue.toLocaleString('vi-VN')}đ</h3>
                </div>
              </div>
              <div className="dash-widget-info">
                <h6 className="text-muted">Doanh thu</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* ... (phần còn lại của dashboard.html) ... */}
      
    </div>
  );
};

export default DashboardPage;