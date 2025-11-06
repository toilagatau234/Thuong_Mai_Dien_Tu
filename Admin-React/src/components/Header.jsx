import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext.jsx';
import avatar from '../assets/img/avatar.jpg'; // (Copy ảnh)

const Header = () => {
  const { user, logout } = useAuth(); // Lấy thông tin user và hàm logout

  return (
    <Navbar expand className="navbar-light navbar-bg">
      {/* Nút này có thể dùng để ẩn/hiện sidebar (cần thêm JS) */}
      <a className="sidebar-toggle js-sidebar-toggle">
        <i className="hamburger align-self-center"></i>
      </a>

      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="ms-auto">
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} className="d-none d-sm-inline-block">
              <img src={avatar} className="avatar img-fluid rounded me-1" alt="Admin" /> 
              <span className="text-dark">
                {/* Hiển thị tên user nếu đã đăng nhập */}
                {user ? user.name : 'Admin'} 
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end">
              <Dropdown.Item href="#">
                <i className="fa-solid fa-user align-middle me-1"></i> Hồ sơ
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>
                <i className="fa-solid fa-arrow-right-from-bracket align-middle me-1"></i>
                Đăng xuất
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;