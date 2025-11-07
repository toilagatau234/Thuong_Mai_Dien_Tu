import React from 'react';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import SidebarComponent from '../SidebarComponent/SidebarComponent';

// Component này đóng vai trò là Layout chính
// props.children chính là nội dung của các trang (Page)
const DefaultComponent = ({ children }) => {
  return (
    // 'main-wrapper' là class gốc từ template HTML của bạn
    <div className="main-wrapper"> 
      
      <HeaderComponent />
      <SidebarComponent />
      
      {/* 'page-wrapper' là nơi chứa nội dung chính */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* props.children chính là nội dung của DashboardPage, ProductPage... */}
          {children} 
        </div>
      </div>

    </div>
  );
};

export default DefaultComponent;