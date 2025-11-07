import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet là nơi nội dung trang con sẽ hiển thị
import Header from '../components/HeaderComponent/HeaderComponent';
import Sidebar from '../components/SidebarComponent/SidebarComponent';

const AdminLayout = () => {
  return (
    <div className="main-wrapper"> {/* Class bọc ngoài cùng từ index.html cũ */}
      <Header />
      <Sidebar />
      
      {/* Đây là nơi nội dung trang (dashboard, product...) sẽ xuất hiện */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Outlet />
        </div>
      </div>
      
    </div>
  );
};

export default AdminLayout;