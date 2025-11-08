import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/HeaderComponent/HeaderComponent';
import Sidebar from '../components/SidebarComponent/SidebarComponent';

const AdminLayout = () => {
  return (
    <div className="main-wrapper"> 
      <Header />
      <Sidebar />
      
      {/* nơi nội dung trang (dashboard, product...) xuất hiện */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Outlet />
        </div>
      </div>
      
    </div>
  );
};

export default AdminLayout;