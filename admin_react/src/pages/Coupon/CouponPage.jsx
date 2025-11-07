import React, { useState, useEffect } from 'react';
import { getApi, postApi, deleteApi } from '../../services/apiService';

// Định nghĩa trạng thái ban đầu cho form
const initialFormState = {
  code: '',
  discount_value: '',
  discount_type: 'percentage', // 'percentage' hoặc 'fixed_amount'
  quantity: '',
  expiration_date: ''
};

const CouponPage = () => {
  // --- State cho Danh sách Coupon ---
  const [coupons, setCoupons] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState(null);

  // --- State cho Form Thêm Mới ---
  const [newCoupon, setNewCoupon] = useState(initialFormState);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  // 1. Hàm tải danh sách coupon (từ coupon.html)
  const fetchCoupons = async () => {
    setListLoading(true);
    setListError(null);
    try {
      // GHI CHÚ: Thay thế URL API nếu cần
      const response = await getApi('/coupon/getAll');
      if (response.data && Array.isArray(response.data.data)) {
        setCoupons(response.data.data);
      } else {
        setCoupons([]);
      }
    } catch (err) {
      setListError('Không thể tải danh sách mã giảm giá.');
      console.error(err);
    } finally {
      setListLoading(false);
    }
  };

  // 2. useEffect để tải danh sách khi trang được mở
  useEffect(() => {
    fetchCoupons();
  }, []); // [] rỗng nghĩa là chỉ chạy 1 lần

  // 3. Hàm xử lý khi gõ vào form (thay thế ng-model)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon(prevCoupon => ({
      ...prevCoupon,
      [name]: value
    }));
  };

  // 4. Hàm submit form (từ add.html và CouponController.js)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn form reload
    setFormLoading(true);
    setFormError(null);
    try {
      // GHI CHÚ: Thay thế URL API nếu cần
      await postApi('/coupon/add', newCoupon);
      
      alert('Thêm mã giảm giá thành công!');
      setNewCoupon(initialFormState); // Xóa rỗng form
      fetchCoupons(); // Tải lại danh sách
      
    } catch (err) {
      setFormError('Thêm thất bại: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  // 5. Hàm xóa coupon (từ coupon.html và CouponController.js)
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mã giảm giá này?')) {
      try {
        // GHI CHÚ: Thay thế URL API nếu cần
        await deleteApi(`/coupon/delete/${id}`);
        alert('Xóa thành công!');
        fetchCoupons(); // Tải lại danh sách
      } catch (err) {
        alert('Xóa thất bại!');
        console.error(err);
      }
    }
  };

  // 6. Hàm định dạng ngày
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // 7. Hàm định dạng giá trị giảm
  const formatDiscount = (value, type) => {
    if (type === 'percentage') {
      return `${value}%`;
    }
    return `${parseInt(value).toLocaleString('vi-VN')}đ`;
  };


  // 8. Render JSX (Gộp 2 file HTML)
  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Quản lý Mã giảm giá</h3>
          </div>
        </div>
      </div>

      {/* ===== PHẦN 1: FORM THÊM MỚI (TỪ add.html) ===== */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Thêm mã giảm giá mới</h5>
            </div>
            <div className="card-body">
              {/* Chuyển đổi form */}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="code">Mã code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="code"
                        name="code"
                        value={newCoupon.code}
                        onChange={handleChange}
                        placeholder="Vd: GIAMGIA10"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="quantity">Số lượng</label>
                      <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={newCoupon.quantity}
                        onChange={handleChange}
                        placeholder="Vd: 100"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="discount_type">Loại giảm giá</label>
                      <select
                        className="form-control"
                        id="discount_type"
                        name="discount_type"
                        value={newCoupon.discount_type}
                        onChange={handleChange}
                      >
                        <option value="percentage">Phần trăm (%)</option>
                        <option value="fixed_amount">Số tiền cố định (đ)</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="discount_value">Giá trị</label>
                      <input
                        type="number"
                        className="form-control"
                        id="discount_value"
                        name="discount_value"
                        value={newCoupon.discount_value}
                        onChange={handleChange}
                        placeholder={newCoupon.discount_type === 'percentage' ? 'Vd: 10' : 'Vd: 50000'}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="expiration_date">Ngày hết hạn</label>
                      <input
                        type="date"
                        className="form-control"
                        id="expiration_date"
                        name="expiration_date"
                        value={newCoupon.expiration_date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Hiển thị lỗi nếu có */}
                {formError && <div className="alert alert-danger">{formError}</div>}

                <div className="text-right">
                  <button type="submit" className="btn btn-primary" disabled={formLoading}>
                    {formLoading ? 'Đang lưu...' : 'Lưu mã giảm giá'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ===== PHẦN 2: DANH SÁCH (TỪ coupon.html) ===== */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Danh sách mã giảm giá</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Mã code</th>
                      <th>Giá trị</th>
                      <th>Số lượng</th>
                      <th>Đã dùng</th>
                      <th>Ngày hết hạn</th>
                      <th>Trạng thái</th>
                      <th className="text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Hiển thị loading */}
                    {listLoading && (
                      <tr>
                        <td colSpan="8" className="text-center">Đang tải...</td>
                      </tr>
                    )}
                    
                    {/* Hiển thị lỗi */}
                    {listError && (
                      <tr>
                        <td colSpan="8" className="text-center text-danger">{listError}</td>
                      </tr>
                    )}

                    {/* Hiển thị dữ liệu */}
                    {!listLoading && !listError && coupons.map((coupon) => (
                      <tr key={coupon.id}>
                        <td>{coupon.id}</td>
                        <td><strong>{coupon.code}</strong></td>
                        <td>{formatDiscount(coupon.discount_value, coupon.discount_type)}</td>
                        <td>{coupon.quantity}</td>
                        <td>{coupon.used_count || 0}</td> {/* Giả sử API trả về 'used_count' */}
                        <td>{formatDate(coupon.expiration_date)}</td>
                        <td>
                          {/* (Thêm logic kiểm tra trạng thái) */}
                          <span className="badge badge-success">Hoạt động</span>
                        </td>
                        <td className="text-right">
                          {/* (Bạn có thể thêm nút Sửa ở đây) */}
                          {/* <button className="btn btn-sm btn-warning me-2">Sửa</button> */}
                          <button
                            onClick={() => handleDelete(coupon.id)}
                            className="btn btn-sm btn-danger"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponPage;