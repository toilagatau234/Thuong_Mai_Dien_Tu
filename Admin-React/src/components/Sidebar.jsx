import React from "react";
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/img/logo.png";

const Sidebar = () => {
    const { logout } = useAuth();
    const location = useLocation(); //dùng để highlight link đang active

    //hàm kiểm tra link nào đang active
    const isActive = (path) => location.pathname === path;

    return (
        <nav id="sidebar" className="sidebar js-sidebar">
        <div className="sidebar-content js-simplebar">
            <a className="sidebar-brand" href="/">
                <img src={logo} height={50} alt="Logo" />
            </a>

            {/* Sử dụng Nav của react-bootstrap */}
            <Nav className="sidebar-nav">
              <Nav.Item className="sidebar-header">Quản lý</Nav.Item>

              <Nav.Item>
                <Nav.Link as={Link} to="/" className="sidebar-link" active={isActive('/')}>
                  <i className="fa-solid fa-chart-line align-middle"></i>
                  <span className="align-middle">Dashboard</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link as={Link} to="/product" className="sidebar-link" active={isActive('/product')}>
                  <i className="fa-solid fa-box-open align-middle"></i>
                  <span className="align-middle">Sản phẩm</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link as={Link} to="/category" className="sidebar-link" active={isActive('/category')}>
                  <i className="fa-solid fa-tags align-middle"></i>
                  <span className="align-middle">Danh mục</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link as={Link} to="/user" className="sidebar-link" active={isActive('/user')}>
                  <i className="fa-solid fa-users align-middle"></i>
                  <span className="align-middle">Người dùng</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link as={Link} to="/order" className="sidebar-link" active={isActive('/order')}>
                  <i className="fa-solid fa-receipt align-middle"></i>
                  <span className="align-middle">Đơn hàng</span>
                </Nav.Link>
              </Nav.Item>

              {/* Nút Đăng xuất */}
              <Nav.Item>
                <Nav.Link onClick={logout} className="sidebar-link">
                  <i className="fa-solid fa-arrow-right-from-bracket align-middle"></i>
                  <span className="align-middle">Đăng xuất</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
      </div>
    </nav>
    );
};

export default Sidebar;