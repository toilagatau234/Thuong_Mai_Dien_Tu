import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import AdminApp from './admin_pages/AdminApp'
import { AuthProvider } from './admin_pages/context/AuthContext'
import 'antd/dist/reset.css'

// 1. Import các trang
import HomePage from './pages/HomePage/HomePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import AccountInfoPage from './pages/AccountInfoPage/AccountInfoPage'
import AddressPage from './pages/AddressPage/AddressPage'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import SignInPage from './pages/SignInPage/SignInPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage'

// 2. Định nghĩa các routes
const userRoutes = [
    { path: '/', page: HomePage, isShowHeader: true },
    { path: '/profile', page: ProfilePage, isShowHeader: true },
    { path: '/account-info', page: AccountInfoPage, isShowHeader: true },
    { path: '/address', page: AddressPage, isShowHeader: true },
    { path: '/products', page: ProductsPage, isShowHeader: true },
    { path: '/sign-up', page: SignUpPage, isShowHeader: false },
    { path: '/sign-in', page: SignInPage, isShowHeader: false },
    { path: '/forgot-password', page: ForgotPasswordPage, isShowHeader: false },
    { path: '/reset-password/:token', page: ResetPasswordPage, isShowHeader: false },

    // SỬA LỖI Ở ĐÂY: Trả lại đường dẫn /product-detail/:id
    { path: '/product-detail/:id', page: ProductDetailPage, isShowHeader: true }, 
];


function App() {
  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminApp />} />
        
        {/* User routes */}
        {userRoutes.map((route) => {
          const Page = route.page
          const Layout = route.isShowHeader ? DefaultComponent : Fragment 
          return (
            <Route 
              key={route.path} 
              path={route.path} 
              element={
                <Layout>
                  <Page />
                </Layout>
              } 
            />
          )
        })}
      </Routes>
    </Router>
  )
}

export default App