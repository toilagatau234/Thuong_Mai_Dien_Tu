import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Dùng để tạo link
import { getApi } from '../../services/apiService';

const OrderPage = () => {
  // State để lưu danh sách, loading và lỗi
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // (có thể thêm state cho phân trang ở đây)

  // Hàm tải danh sách đơn hàng
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      // Thay thế URL API nếu cần
      const response = await getApi('/order/getAll');
      if (response.data && Array.isArray(response.data.data)) {
        setOrders(response.data.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      setError('Không thể tải danh sách đơn hàng.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect để gọi hàm fetchOrders khi trang tải
  useEffect(() => {
    fetchOrders();
  }, []);

  // --- Helper Functions  ---
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatPrice = (price) => {
    return parseInt(price || 0).toLocaleString('vi-VN') + 'đ';
  };

  // Hàm hiển thị trạng thái
  const getStatusLabel = (status) => {
    switch (status) {
      case 0: return <span className="badge badge-warning">Chờ xác nhận</span>;
      case 1: return <span className="badge badge-info">Đã xác nhận</span>;
      case 2: return <span className="badge badge-primary">Đang giao</span>;
      case 3: return <span className="badge badge-success">Đã giao</span>;
      case 4: return <span className="badge badge-danger">Đã hủy</span>;
      default: return <span className="badge badge-secondary">Không rõ</span>;
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Quản lý Đơn hàng</h3>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Tất cả đơn hàng</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Khách hàng</th>
                      <th>Ngày đặt</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                      <th className="text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* GHI CHÚ: ng-repeat -> .map() */}
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.user?.name || 'N/A'}</td>
                        <td>{formatDate(order.created_at)}</td>
                        <td>{formatPrice(order.total_amount)}</td>
                        <td>{getStatusLabel(order.status)}</td>
                        <td className="text-right">
                          {/* GHI CHÚ: ng-click="viewDetail(o.id)" 
                            -> <Link to=... >
                          */}
                          <Link
                            to={`/admin/order/detail/${order.id}`}
                            className="btn btn-sm btn-info"
                          >
                            Xem
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* (Thêm code phân trang) */}
          
        </div>
      </div>
    </div>
  );
};

export default OrderPage;