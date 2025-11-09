import React from 'react';
// Sửa đường dẫn import
import Sidebar from '../components/SidebarComponent/SidebarComponent';
import Header from '../components/HeaderComponent/HeaderComponent';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Outlet là nơi render nội dung của các route con */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;