import React, { useEffect } from 'react';
import Sidebar from '../components/SidebarComponent/SidebarComponent';
import Header from '../components/HeaderComponent/HeaderComponent';
import { Outlet } from 'react-router-dom';


const AdminLayout = () => {
  useEffect(() => {
    document.body.classList.add('admin-body');

    return () => {
      document.body.classList.remove('admin-body');
    };
  }, []);


  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />

      {/* Page Wrapper chứa nội dung chính */}
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