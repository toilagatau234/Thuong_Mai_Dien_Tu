import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../services/apiService';
import Cookies from 'js-cookie';
import '../../../public/assets/css/style.css';
import '../../../public/assets/css/bootstrap.min.css';

const LoginPage = () => {
  // Dùng để lưu trữ giá trị của các ô input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn form reload lại trang
    setError(null);

    try {
      // Gọi API service
      const response = await loginAdmin({ email: email, password: password });

      // Kiểm tra API trả về thành công
      if (response.data && response.data.token) {
        
        // Lưu token vào cookie
        Cookies.set('admin_token', response.data.token, { expires: 0.01 }); // ~15p 

        // Chuyển hướng đến trang dashboard
        navigate('/admin/dashboard');
      } else {
        setError('Thông tin đăng nhập không hợp lệ.');
      }
    } catch (err) {
      // Bắt lỗi từ API
      setError('Email hoặc mật khẩu không chính xác.');
      console.error("Lỗi đăng nhập:", err);
    }
  };

  // Render giao diện 
  return (
    <div className="main-wrapper login-body">
      <div className="login-wrapper">
        <div className="container">
          <div className="loginbox">
            <div className="login-left">
              <img className="img-fluid" src={"../../assets/img/logo.svg"} alt="Logo" />
            </div>
            <div className="login-right">
              <div className="login-right-wrap">
                <h1>Đăng nhập Admin</h1>
                <p className="account-subtitle">Truy cập vào trang quản trị</p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Hiển thị thông báo lỗi nếu có */}
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <div className="form-group">
                    <button className="btn btn-primary btn-block" type="submit">
                      Đăng nhập
                    </button>
                  </div>
                </form>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;