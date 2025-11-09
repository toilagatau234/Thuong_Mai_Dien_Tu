import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
// import { Link } from 'react-router-dom';
// import logo from '../../assets/img/logo.png';
// import logoSmall from '../../assets/img/logo.png';
import defaultAvatar from '../../assets/img/avatar.jpg';
import {
  HeaderContainer,
  HeaderLeft,
  ToggleButton,
  UserMenu,
  UserDropdown
} from './style';

const Header = ({ onToggleSidebar, className }) => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleToggleSidebar = (e) => {
    e.preventDefault();
    if (onToggleSidebar) {
      onToggleSidebar();
    }
  };

  return (
    <HeaderContainer className={className || ''}>
      <HeaderLeft>
        {/* <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
        <Link to="/" className="logo logo-small">
          <img src={logoSmall} alt="Logo" width="30" height="30" />
        </Link> */}
        <ToggleButton onClick={handleToggleSidebar}>
          <i className="fas fa-bars"></i>
        </ToggleButton>
      </HeaderLeft>

      <UserMenu>
        <UserDropdown>
          <button className="dropdown-toggle" type="button" onClick={handleToggleDropdown} aria-expanded={isDropdownOpen}>
            <span className="user-img">
              <img
                src={user?.avatar || defaultAvatar}
                alt={user?.fullname || 'Admin'}
              />
            </span>
          </button>
          <div className={`dropdown-menu${isDropdownOpen ? ' show' : ''}`}>
            <div className="user-header">
              <h6>{user?.fullname || 'Admin User'}</h6>
              <p>{user?.role || 'admin'}</p>
            </div>
            <button className="dropdown-item" type="button" onClick={logout}>Logout</button>
          </div>
        </UserDropdown>
      </UserMenu>
    </HeaderContainer>
  );
};

export default Header;