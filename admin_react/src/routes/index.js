import React from 'react';
// CHÚNG TA IMPORT 'Navigate' TỪ ĐÂY
import { Navigate } from 'react-router-dom';

// Import các trang (đường dẫn đã sửa cho đúng)
import DashboardPage from '../pages/Dashboard/DashboardPage';
import LoginPage from '../pages/Login/LoginPage';
import CategoryPage from '../pages/Category/CategoryPage';
import ProductPage from '../pages/Product/ProductPage';
import ProductAddPage from '../pages/ProductAdd/ProductAddPage';
// (Bạn chưa tạo ProductEditPage, nên tôi tạm thời comment lại)
// import ProductEditPage from '../pages/Product/ProductEditPage'; 
import OrderPage from '../pages/Order/OrderPage';
import OrderDetailPage from '../pages/Order/OrderDetailPage';
import UserPage from '../pages/User/UserPage';
import UserAddPage from '../pages/User/UserAddPage';
import UserEditPage from '../pages/User/UserEditPage';
import CouponPage from '../pages/Coupon/CouponPage';
import FeedbackPage from '../pages/Feedback/FeedbackPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

// HÀM HELPER: ĐỔI TÊN HÀM NÀY
// Tên cũ là 'Navigate', bị trùng với thư viện
const NavigateToDashboard = () => <Navigate to="/admin/dashboard" replace />;

export const routes = [
  {
    path: '/login',
    page: LoginPage,
    isShowHeader: false,
    isPrivate: false,
  },
  {
    path: '/admin/dashboard',
    page: DashboardPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/admin/category',
    page: CategoryPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/admin/product',
    page: ProductPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/admin/product/add',
    page: ProductAddPage,
    isShowHeader: true,
    isPrivate: true,
  },
  // (Thêm route cho ProductEditPage khi bạn tạo nó)
  // {
  //   path: '/admin/product/edit/:id',
  //   page: ProductEditPage,
  //   isShowHeader: true,
  //   isPrivate: true,
  // },
  {
    path: '/admin/order',
    page: OrderPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/admin/order/detail/:id',
    page: OrderDetailPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/admin/user',
    page: UserPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/admin/user/add',
    page: UserAddPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/admin/user/edit/:id',
    page: UserEditPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/admin/coupon',
    page: CouponPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/admin/feedback',
    page: FeedbackPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: '/',
    page: NavigateToDashboard, // <-- SỬ DỤNG TÊN MỚI
    isShowHeader: false,
    isPrivate: true,
  },
  {
    path: '/admin',
    page: NavigateToDashboard, // <-- SỬ DỤNG TÊN MỚI
    isShowHeader: false,
    isPrivate: true,
  },
  {
    path: '*', // Trang 404
    page: NotFoundPage,
    isShowHeader: false,
    isPrivate: false,
  },
];