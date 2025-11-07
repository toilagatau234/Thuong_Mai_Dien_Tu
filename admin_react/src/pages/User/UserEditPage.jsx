import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getApi, putApi } from '../../services/apiService';

const UserEditPage = () => {
  // 1. Lấy ID từ URL (thay thế $routeParams.id)
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    role_id: '0',
  });
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState(null);

  // 3. useEffect để tải dữ liệu user (thay thế $scope.getUser)
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        // GHI CHÚ: Thay thế URL API nếu cần
        const response = await getApi(`/user/detail/${id}`);
        if (response.data) {
          // Gán dữ liệu vào form
          setFormData({
            name: response.data.name,
            email: response.data.email,
            phone_number: response.data.phone_number || '',
            address: response.data.address || '',
            role_id: response.data.role_id.toString(), // Chuyển sang string
          });
        } else {
          setError('Không tìm thấy người dùng.');
        }
      } catch (err) {
        setError('Tải dữ liệu thất bại.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]); // Chạy lại nếu id thay đổi

  // 4. Hàm cập nhật state khi gõ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 5. Hàm submit form (thay thế $scope.updateUser)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setError(null);
    try {
      // GHI CHÚ: Thay thế URL API nếu cần
      await putApi(`/user/update/${id}`, formData);
      alert('Cập nhật người dùng thành công!');
      navigate('/admin/user'); // Quay về trang danh sách
    } catch (err) {
      setError('Cập nhật thất bại: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setSaveLoading(false);
    }
  };
  
  // 6. Render JSX (từ user/edit.html)
  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Cập nhật Người dùng</h3>
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
                      <label>Địa chỉ</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
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

                {/* Ghi chú: Thường không cho phép sửa mật khẩu ở đây 
                    hoặc sẽ là một form riêng. Bỏ qua trường mật khẩu.
                */}

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="text-right">
                  <button type="submit" className="btn btn-primary" disabled={saveLoading}>
                    {saveLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
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

export default UserEditPage;