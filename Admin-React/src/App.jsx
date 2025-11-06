import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

import Layout from './components/Layout.jsx';
import Login from './pages/login.jsx';
import Dashboard from './pages/Dashboard.jsx';

import './assets/css/style.css'


// (Thêm placeholder cho các trang khác)
// import ProductList from './pages/product/ProductList.js';
// import CategoryList from './pages/category/CategoryList.js';
// import UserList from './pages/user/UserList.js';
// import OrderList from './pages/order/OrderList.js';


/**
 * Component bảo vệ các route.
 * Nếu chưa đăng nhập, nó sẽ đá về trang /login.
 */
const ProtectedRoute = ({ children }) => {
  // const {token} = useAuth();
  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }
  return children;

};

/**
 * Component cho trang Login.
 * Nếu đã đăng nhập, nó sẽ đá về trang / (Dashboard).
 */
const LoginRoute = ({ children }) => {
    const { token } = useAuth();
    if (token) {
        return <Navigate to="/" replace />;
    }
    return children;
}


function App() {

  return (
    <Routes>
      {/*__________ Route trang login__________ */}

      <Route  path="/login" element={ 
        <LoginRoute>
          <Login />
        </LoginRoute> }
      />

      {/*__________ Route được bảo vệ bắc buộc phải đăng nhập__________ */}

    <Route path="/" element={
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    }>

      {/* Trang con mặc định khi vào "/" */}
      <Route index element={ <Dashboard /> } />


      {/* thêm vào các trang con ở đây */}
      {/* <Route path="product" element={ <ProductList /> } />
      <Route path="category" element={ <CategoryList /> } />
      <Route path="user" element={ <UserList /> } />
      <Route path="order" element={ <OrderList /> } /> */}
    
    </Route>


    {/*Route 404 không tìm thấy trang */}
    <Route path="*" element={ <h1>404 Not Found</h1> } />  {/* chưa code */}

    </Routes>
  );
}

export default App;
