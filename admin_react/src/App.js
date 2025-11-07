import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import AdminLayout from './layouts/AdminLayout'; // Import Layout từ Bước 7
import Cookies from 'js-cookie';

// Component này dùng để bảo vệ các trang Admin
// Nó kiểm tra xem đã đăng nhập (có cookie) chưa
const PrivateRoute = ({ children }) => {
  const token = Cookies.get('admin_token');
  // Nếu có token, cho phép vào. Nếu không, đá về trang /login
  return token ? children : <Navigate to="/login" replase />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          const Page = route.page;
          
          // Kiểm tra xem route này có cần Layout (Header/Sidebar) không
          const Layout = route.isShowHeader ? AdminLayout : React.Fragment;
          
          // Kiểm tra xem route này có cần bảo vệ (đăng nhập) không
          const isProtected = route.isShowHeader; // Tạm dùng isShowHeader để quyết định bảo vệ

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                isProtected ? (
                  <PrivateRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </PrivateRoute>
                ) : (
                  <Layout>
                    <Page />
                  </Layout>
                )
              }
            />
          );
        })}
        
        {/* Thêm 1 route mặc định: nếu vào /admin thì tự chuyển đến dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;