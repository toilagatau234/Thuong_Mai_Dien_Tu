import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Outlet nơi render nội dung của các route con */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;