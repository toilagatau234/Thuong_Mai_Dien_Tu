import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="menu-title"><span>Main Menu</span></li>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                <i className="fas fa-home"></i> <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" className={({ isActive }) => (isActive ? 'active' : '')}>
                <i className="fas fa-list-alt"></i> <span>Categories</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
                <i className="fas fa-box"></i> <span>Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders" className={({ isActive }) => (isActive ? 'active' : '')}>
                <i className="fas fa-shipping-fast"></i> <span>Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>
                <i className="fas fa-users"></i> <span>Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/coupons" className={({ isActive }) => (isActive ? 'active' : '')}>
                <i className="fas fa-tags"></i> <span>Coupons</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/feedback" className={({ isActive }) => (isActive ? 'active' : '')}>
                <i className="fas fa-comments"></i> <span>Feedback</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;