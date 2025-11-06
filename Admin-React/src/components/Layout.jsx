import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar.jsx'
import Header from './Header.jsx'

const Layout = () => {
    return(
        <div className="wrapper">
            <Sidebar />
            <div className="main">
                <Header />
                <main className="content">
                    <div className="container-fluid p-0">
                        {/* Đây là nơi các trang con (Dashboard, Product...) được render */}
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;