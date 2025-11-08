import React from 'react';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import SidebarComponent from '../SidebarComponent/SidebarComponent';

const DefaultComponent = ({ children }) => {
  return (
    // 'main-wrapper' là class gốc từ template HTML của bạn
    <div className="main-wrapper"> 
      
      <HeaderComponent />
      <SidebarComponent />
      
      {/* 'page-wrapper' nơi chứa nội dung chính */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* props.children nội dung của DashboardPage, ProductPage... */}
          {children} 
        </div>
      </div>

    </div>
  );
};

export default DefaultComponent;