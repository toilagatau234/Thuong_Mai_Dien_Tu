import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../services/apiService';
import Cookies from 'js-cookie';

const LoginPage = () => {
  // 1. Thay thế $scope bằng 'useState'
  // Dùng để lưu trữ giá trị của các ô input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Dùng để lưu thông báo lỗi
  const navigate = useNavigate(); // Dùng để chuyển trang (thay thế $location)

  // 2. Thay thế hàm $scope.login()
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn form reload lại trang
    setError(null); // Xóa lỗi cũ

    try {
      // 3. Gọi API service
      const response = await loginAdmin({ email: email, password: password });

      // 4. Kiểm tra API trả về thành công (Giả sử API trả về token)
      if (response.data && response.data.token) {
        
        // 5. Lưu token vào cookie (thay thế $cookieStore.put)
        Cookies.set('admin_token', response.data.token, { expires: 1 }); // Lưu 1 ngày

        // 6. Chuyển hướng đến trang dashboard
        navigate('/admin/dashboard');
      } else {
        setError('Thông tin đăng nhập không hợp lệ.');
      }
    } catch (err) {
      // 7. Bắt lỗi từ API
      setError('Email hoặc mật khẩu không chính xác.');
      console.error("Lỗi đăng nhập:", err);
    }
  };

  // 3. Render giao diện (Copy từ login.html)
  return (
    <div className="main-wrapper login-body">
      <div className="login-wrapper">
        <div className="container">
          <div className="loginbox">
            <div className="login-left">
              {/* Sửa đường dẫn ảnh logo */}
              <img className="img-fluid" src={"/assets/img/logo2.png"} alt="Logo" />
            </div>
            <div className="login-right">
              <div className="login-right-wrap">
                <h1>Đăng nhập Admin</h1>
                <p className="account-subtitle">Truy cập vào trang quản trị</p>

                {/* GHI CHÚ: ng-submit -> onSubmit */}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    {/* GHI CHÚ: ng-model -> value + onChange */}
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