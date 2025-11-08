import React from 'react';
import { Navigate } from 'react-router-dom';

import DashboardPage from '../pages/Dashboard/DashboardPage';
import LoginPage from '../pages/Login/LoginPage';
import CategoryPage from '../pages/Category/CategoryPage';
import ProductPage from '../pages/Product/ProductPage';
import ProductAddPage from '../pages/ProductAdd/ProductAddPage';
import ProductEditPage from '../pages/ProductEditPage/ProductEditPage'; 
import OrderPage from '../pages/Order/OrderPage';
import OrderDetailPage from '../pages/Order/OrderDetailPage';
import UserPage from '../pages/User/UserPage';
import UserAddPage from '../pages/User/UserAddPage';
import UserEditPage from '../pages/User/UserEditPage';
import CouponPage from '../pages/Coupon/CouponPage';
import FeedbackPage from '../pages/Feedback/FeedbackPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';


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
  {
    path: '/admin/product/edit/:id',
    page: ProductEditPage,
    isShowHeader: true,
    isPrivate: true,
  },
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
    page: NavigateToDashboard,
    isShowHeader: false,
    isPrivate: true,
  },
  {
    path: '/admin',
    page: NavigateToDashboard,
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