import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';
import GlobalStyle from '../GlobalStyle';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProductPage from './pages/Product/ProductPage';
import UserPage from './pages/User/UserPage';


function AdminApp() {
  return (
    <AuthProvider>
      <GlobalStyle />
        <Routes>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="users" element={<UserPage />} />
        </Routes>
      <AppRoutes />
    </AuthProvider>
  );
}

export default AdminApp;