import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../services/api.js'; // Import API service của chúng ta
import logo from '../assets/img/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate(); // Dùng để chuyển hướng sau khi login

  // Logic này lấy từ Admin/src/controllers/LoginController.js
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn form submit theo cách truyền thống
    setLoading(true);

    try {
      // Dùng service 'api' đã tạo
      const response = await api.post('/user/login', { email, password });
      
      // response.data trả về từ server của bạn
      if (response.data && response.data.token) {
        // Kiểm tra quyền (role)
        if(response.data.data.role !== 'admin' && response.data.data.role !== 'manager') {
            Swal.fire('Lỗi!', 'Bạn không có quyền truy cập trang quản trị.', 'error');
            setLoading(false);
            return;
        }

        // Gọi hàm login từ AuthContext
        login(response.data.token); 
        
        Swal.fire('Thành công!', 'Đăng nhập thành công!', 'success');
        
        // Chuyển hướng về trang Dashboard
        navigate('/'); 
      } else {
        throw new Error(response.data.message || 'Thông tin đăng nhập không đúng');
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || error.message || 'Đã xảy ra lỗi';
      Swal.fire('Lỗi!', errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="d-flex w-100 vh-100">
      <Container className="d-flex flex-column">
        <Row className="h-100">
          <Col sm={10} md={8} lg={6} xl={5} className="mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <img src={logo} height={80} alt="Logo" />
                <h1 className="h2 mt-3">Đăng nhập</h1>
                <p className="lead">Đăng nhập vào trang quản trị Sandra</p>
              </div>

              <Card>
                <Card.Body>
                  <div className="m-sm-4">
                    {/* Chuyển đổi form HTML sang React-Bootstrap */}
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Nhập email của bạn"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Nhập mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </Form.Group>
                      
                      <div className="d-grid gap-2 mt-3">
                        <Button type="submit" variant="primary" size="lg" disabled={loading}>
                          {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Login;