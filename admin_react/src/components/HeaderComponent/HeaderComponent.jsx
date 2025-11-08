import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


import logo from '../../assets/img/logo.png'; 
import avatar from '../../assets/img/avatar.jpg';

const HeaderComponent = () => {
  const navigate = useNavigate();

  // Hàm đăng xuất
  const handleLogout = () => {
    Cookies.remove('admin_token');
    navigate('/login');
  };

  return (
    <div className="header">
      {/* Logo */}
      <div className="header-left">
        <Link to="/admin/dashboard" className="logo">
          <img src={"../assets/img/logo.png"} alt="Logo" />
        </Link>
        <Link to="/admin/dashboard" className="logo logo-small">
          <img src={"../assets/img/logo2.png"} alt="Logo" width="30" height="30" />
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
                src={"/assets/img/avatar.jpg"}
                width="31"
                alt="Admin"
              />
            </span>
          </a>
          <div className="dropdown-menu">
            <div className="user-header">
              <div className="avatar avatar-sm">
                <img
                  src={"/assets/img/avatar.jpg"}
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