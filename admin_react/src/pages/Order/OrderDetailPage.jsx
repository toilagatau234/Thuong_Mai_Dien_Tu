import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Dùng useParams để lấy ID từ URL
import { getApi, putApi } from '../../services/apiService'; // Dùng putApi để cập nhật

const OrderDetailPage = () => {
  // Lấy ID từ URL
  const { id } = useParams();

  // State để lưu chi tiết đơn hàng, loading, lỗi
  const [order, setOrder] = useState(null); // Bắt đầu là null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State để quản lý việc cập nhật trạng thái
  const [newStatus, setNewStatus] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  // Hàm tải chi tiết đơn hàng
  const fetchOrderDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      // Thay thế URL API nếu cần
      const response = await getApi(`/order/detail/${id}`);
      if (response.data) {
        setOrder(response.data);
        setNewStatus(response.data.status); // Gán trạng thái hiện tại cho <select>
      } else {
        setError('Không tìm thấy đơn hàng.');
      }
    } catch (err) {
      setError('Không thể tải chi tiết đơn hàng.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect để gọi hàm fetchOrderDetail khi trang tải
  useEffect(() => {
    fetchOrderDetail();
  }, [id]); // Phụ thuộc vào 'id'

  // Hàm cập nhật trạng thái
  const handleUpdateStatus = async () => {
    setUpdateLoading(true);
    setUpdateError(null);
    try {
      // Thay thế URL API nếu cần
      await putApi(`/order/updateStatus/${id}`, { status: newStatus });
      
      alert('Cập nhật trạng thái thành công!');
      // Tải lại dữ liệu để thấy thay đổi
      fetchOrderDetail(); 

    } catch (err) {
      setUpdateError('Cập nhật thất bại: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setUpdateLoading(false);
    }
  };
  
  // --- Helper Functions ---
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatPrice = (price) => {
    return parseInt(price || 0).toLocaleString('vi-VN') + 'đ';
  };
  
  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!order) return <div className="alert alert-warning">Không có dữ liệu đơn hàng.</div>;

  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Chi tiết Đơn hàng #{order.id}</h3>
          </div>
          <div className="col-auto text-right">
            <Link to="/admin/order" className="btn btn-secondary">
              <i className="fas fa-arrow-left"></i> Quay lại
            </Link>
          </div>
        </div>
      </div>

      <div className="row">
        {/* --- Thông tin đơn hàng --- */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Chi tiết sản phẩm</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Hình ảnh</th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                      <th>Tổng phụ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* GHI CHÚ: ng-repeat -> .map() */}
                    {order.order_details && order.order_details.map((item) => (
                      <tr key={item.id}>
                        <td>{item.product?.name || 'N/A'}</td>
                        <td>
                          <img 
                            src={item.product?.image || '/assets/img/logo2.png'} 
                            alt={item.product?.name} 
                            width="50"
                          />
                        </td>
                        <td>{item.quantity}</td>
                        <td>{formatPrice(item.price)}</td>
                        <td>{formatPrice(item.quantity * item.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* --- Thông tin khách hàng & Trạng thái --- */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Thông tin chung</h5>
            </div>
            <div className="card-body">
              <h5>Khách hàng</h5>
              <p className="text-muted">
                {order.user?.name || 'N/A'}<br />
                {order.user?.email || 'N/A'}<br />
                {order.user?.phone_number || 'N/A'}
              </p>
              
              <h5>Địa chỉ giao hàng</h5>
              <p className="text-muted">
                {order.shipping_address || 'N/A'}<br />
                {/* (Thêm phường/xã, quận/huyện hoặc API gg map) */}
              </p>
              
              <hr />

              <h5>Tổng cộng</h5>
              <p><strong>Tổng tiền hàng:</strong> {formatPrice(order.total_amount - (order.shipping_fee || 0))}</p>
              <p><strong>Phí vận chuyển:</strong> {formatPrice(order.shipping_fee)}</p>
              <h4 className="text-danger">Tổng thanh toán: {formatPrice(order.total_amount)}</h4>
              
              <hr />
              
              {/* Cập nhật trạng thái */}
              <h5>Cập nhật Trạng thái</h5>
              <div className="form-group">
                <select 
                  className="form-control" 
                  value={newStatus} 
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="0">Chờ xác nhận</option>
                  <option value="1">Đã xác nhận</option>
                  <option value="2">Đang giao</option>
                  <option value="3">Đã giao</option>
                  <option value="4">Đã hủy</option>
                </select>
              </div>
              
              {updateError && <div className="alert alert-danger">{updateError}</div>}
              
              <button 
                className="btn btn-primary w-100" 
                onClick={handleUpdateStatus}
                disabled={updateLoading}
              >
                {updateLoading ? 'Đang cập nhật...' : 'Cập nhật'}
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;