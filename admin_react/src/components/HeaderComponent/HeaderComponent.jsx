import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// GHI CHÚ: Hãy thay thế các đường dẫn ảnh này bằng ảnh của bạn
// trong 'public/assets/img/'
import logo from '../../assets/img/logo.svg'; // Bạn cần import logo hoặc dùng đường dẫn public
import avatar from '../../assets/img/avatar.jpg';

const HeaderComponent = () => {
  const navigate = useNavigate();

  // Hàm đăng xuất
  // Giống hệt $scope.logout trong AppController.js
  const handleLogout = () => {
    // Xóa token khỏi cookie
    Cookies.remove('admin_token');
    // Điều hướng về trang login
    navigate('/login');
  };

  return (
    <div className="header">
      {/* Logo */}
      <div className="header-left">
        <Link to="/admin/dashboard" className="logo">
          <img src={"/assets/img/logo.png"} alt="Logo" />
        </Link>
        <Link to="/admin/dashboard" className="logo logo-small">
          <img src={"/assets/img/logo2.png"} alt="Logo" width="30" height="30" />
        </Link>
      </div>

      {/* Nút thu gọn Sidebar */}
      <a href="javascript:void(0);" id="toggle_btn">
        <i className="fas fa-align-left"></i>
      </a>

      {/* Menu User */}
      <ul className="nav user-menu">
        <li className="nav-item dropdown has-arrow">
          <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
            <span className="user-img">
              <img
                className="rounded-circle"
                src={"/assets/img/avatar.jpg"} // Sửa đường dẫn ảnh
                width="31"
                alt="Admin"
              />
            </span>
          </a>
          <div className="dropdown-menu">
            <div className="user-header">
              <div className="avatar avatar-sm">
                <img
                  src={"/assets/img/avatar.jpg"} // Sửa đường dẫn ảnh
                  alt="User Image"
                  className="avatar-img rounded-circle"
                />
              </div>
              <div className="user-text">
                <h6>Admin</h6>
                <p className="text-muted mb-0">Quản trị viên</p>
              </div>
            </div>
            <a className="dropdown-item" href="#">Hồ sơ của tôi</a>
            
            {/* GHI CHÚ:
              Thay vì dùng <a>, chúng ta dùng <button> và sự kiện onClick
              để gọi hàm handleLogout()
            */}
            <button className="dropdown-item" onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HeaderComponent;