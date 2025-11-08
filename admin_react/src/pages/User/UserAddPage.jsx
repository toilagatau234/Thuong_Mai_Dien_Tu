import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postApi } from '../../services/apiService';

const UserAddPage = () => {
  // State cho form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    address: '',
    role_id: '0', // Mặc định là Khách hàng (0)
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); // Dùng để chuyển trang

  // Hàm cập nhật state khi gõ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Hàm submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Thay thế URL API nếu cần
      await postApi('/user/add', formData);
      alert('Thêm người dùng thành công!');
      navigate('/admin/user'); // Quay về trang danh sách
    } catch (err) {
      setError('Thêm thất bại: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Thêm Người dùng mới</h3>
          </div>
          <div className="col-auto text-right">
            <Link to="/admin/user" className="btn btn-secondary">
              <i className="fas fa-arrow-left"></i> Quay lại
            </Link>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Họ Tên</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Số điện thoại</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Mật khẩu</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Vai trò</label>
                  <select
                    className="form-control"
                    name="role_id"
                    value={formData.role_id}
                    onChange={handleChange}
                  >
                    <option value="0">Khách hàng</option>
                    <option value="1">Admin</option>
                  </select>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="text-right">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Đang lưu...' : 'Lưu'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddPage;