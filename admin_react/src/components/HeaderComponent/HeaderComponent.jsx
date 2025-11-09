import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo2.png';
import logoSmall from '../../assets/img/logo.svg';
import defaultAvatar from '../../assets/img/avatar.jpg';

const Header = () => {
  const { user, logout } = useAuth();

  // Hàm toggle sidebar (giống script.js)
  const toggleSidebar = (e) => {
    e.preventDefault();
    document.body.classList.toggle('mini-sidebar');
  };

  return (
    <div className="header">
      {/* Logo */}
      <div className="header-left">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
        <Link to="/" className="logo logo-small">
          <img src={logoSmall} alt="Logo" width="30" height="30" />
        </Link>
      </div>

      {/* Nút Toggle Sidebar */}
      <a id="toggle_btn" href="#" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </a>

      {/* Menu User */}
      <ul className="nav user-menu">
        <li className="nav-item dropdown has-arrow">
          <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
            <span className="user-img">
              <img
                className="rounded-circle"
                src={user?.avatar || defaultAvatar}
                width="31"
                alt={user?.fullname || 'Admin'}
              />
            </span>
          </a>
          <div className="dropdown-menu">
            <div className="user-header">
              <h6>{user?.fullname || 'Admin User'}</h6>
              <p className="text-muted mb-0">{user?.role || 'admin'}</p>
            </div>
            {/* <a className="dropdown-item" href="#">My Profile</a> */}
            <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Header;