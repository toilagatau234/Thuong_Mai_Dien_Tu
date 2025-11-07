import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApi, deleteApi } from '../../services/apiService';

const UserPage = () => {
  // 1. State
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Hàm tải danh sách
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      // GHI CHÚ: Thay thế URL API nếu cần
      const response = await getApi('/user/getAll');
      if (response.data && Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      setError('Không thể tải danh sách người dùng.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 3. useEffect để tải dữ liệu khi vào trang
  useEffect(() => {
    fetchUsers();
  }, []);

  // 4. Hàm xóa (thay thế $scope.deleteUser)
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        // GHI CHÚ: Thay thế URL API nếu cần
        await deleteApi(`/user/delete/${id}`);
        alert('Xóa thành công!');
        fetchUsers(); // Tải lại danh sách
      } catch (err) {
        alert('Xóa thất bại!');
        console.error(err);
      }
    }
  };
  
  // --- Helper Functions ---
  const getRoleLabel = (roleId) => {
    // Giả sử: 0 = Khách hàng, 1 = Admin/Nhân viên
    return roleId === 1 ? 
      <span className="badge badge-success">Admin</span> : 
      <span className="badge badge-info">Khách hàng</span>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // 5. Render JSX (từ user.html)
  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Quản lý Người dùng</h3>
          </div>
          <div className="col-auto text-right">
            {/* Link đến trang thêm mới */}
            <Link to="/admin/user/add" className="btn btn-primary">
              <i className="fas fa-plus"></i> Thêm người dùng
            </Link>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Tất cả người dùng</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên</th>
                      <th>Email</th>
                      <th>SĐT</th>
                      <th>Địa chỉ</th>
                      <th>Vai trò</th>
                      <th>Ngày tạo</th>
                      <th className="text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* GHI CHÚ: ng-repeat -> .map() */}
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone_number || 'N/A'}</td>
                        <td>{user.address || 'N/A'}</td>
                        <td>{getRoleLabel(user.role_id)}</td>
                        <td>{formatDate(user.created_at)}</td>
                        <td className="text-right">
                          {/* Link đến trang Sửa */}
                          <Link
                            to={`/admin/user/edit/${user.id}`}
                            className="btn btn-sm btn-warning me-2"
                          >
                            Sửa
                          </Link>
                          {/* Nút Xóa */}
                          <button
                            onClick={() => handleDelete(user.id)}
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

export default UserPage;