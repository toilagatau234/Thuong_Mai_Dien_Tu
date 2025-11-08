import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarComponent = () => {
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="menu-title">
              <span>Main Menu</span>
            </li>
            <li>
              <NavLink to="/admin/dashboard">
                <i className="fas fa-home"></i> <span> Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/category">
                <i className="fas fa-list"></i> <span> Danh mục</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/product">
                <i className="fas fa-box"></i> <span> Sản phẩm</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/order">
                <i className="fas fa-shopping-cart"></i> <span> Đơn hàng</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/user">
                <i className="fas fa-users"></i> <span> Khách hàng</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/coupon">
                <i className="fas fa-tags"></i> <span> Mã giảm giá</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/feedback">
                <i className="fas fa-comments"></i> <span> Phản hồi</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/admin/statistical">
                <i className="fas fa-chart-bar"></i> <span> Thống kê</span>
              </NavLink>
            </li> 
            */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;