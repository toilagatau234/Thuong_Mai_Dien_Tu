import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Result, Button, message, Spin } from 'antd'; 
import axios from 'axios';

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  // === SỬA DÒNG NÀY ĐỂ BẮT ĐƯỢC MỌI TRƯỜNG HỢP ===
  const responseCode = queryParams.get('code') || queryParams.get('vnp_ResponseCode');
  // ===============================================

  const isCalled = useRef(false);

  useEffect(() => {
    // Chỉ chạy khi mã lỗi = 00 (Thành công) và chưa gọi API lần nào
    if (responseCode === '00' && !isCalled.current) {
        isCalled.current = true;
        const pendingOrder = JSON.parse(localStorage.getItem('PENDING_ORDER'));

        if (pendingOrder) {
            // === 1. LẤY TOKEN VÀ LÀM SẠCH (FIX LỖI 401) ===
            let token = localStorage.getItem('access_token');
            if (token && typeof token === 'string') {
                if (token.startsWith('"') && token.endsWith('"')) {
                    token = token.slice(1, -1);
                }
            }
            
            // Nếu không có token thì không gửi được
            if (!token) {
                message.error("Lỗi xác thực: Không tìm thấy Token! Hãy đăng nhập lại.");
                return;
            }

            // === 2. CẤU HÌNH HEADER ===
            const config = {
                headers: {
                    token: `Bearer ${token}`,
                    Authorization: `Bearer ${token}`
                }
            };

            // Thêm trạng thái đã thanh toán
            const finalOrder = { 
                ...pendingOrder, 
                isPaid: true, 
                paidAt: new Date(), 
                paymentMethod: 'vnpay' 
            };

            console.log("Đang lưu đơn hàng với Token:", token);

            // === 3. GỌI API VỚI CONFIG (QUAN TRỌNG NHẤT) ===
            axios.post('http://localhost:8080/api/order/create', finalOrder, config)
                .then(res => {
                    if(res.data.status === 'OK') {
                        message.success('Đã lưu đơn hàng thành công!');
                        localStorage.removeItem('PENDING_ORDER'); // Xóa đơn chờ
                    }
                })
                .catch(err => {
                    console.error('Lỗi lưu đơn:', err);
                    if(err.response?.status === 401) {
                         message.error('Phiên đăng nhập hết hạn, không thể lưu đơn!');
                    } else {
                         message.error('Lỗi khi lưu đơn hàng!');
                    }
                });
        }
    }
  }, [responseCode]);

  return (
    <div style={{ padding: '50px', textAlign: 'center', background: '#f5f5fa', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {responseCode === '00' ? (
        <Result
          status="success"
          title="Thanh toán thành công!"
          subTitle="Đơn hàng của bạn đã được thanh toán và hệ thống đang xử lý."
          extra={[
            <Button type="primary" key="home" onClick={() => navigate('/')}>
              Về trang chủ
            </Button>,
            <Button key="orders" onClick={() => navigate('/my-orders')}>
              Xem đơn hàng
            </Button>
          ]} 
        />
      ) : (
        <Result
          status="error"
          title="Thanh toán thất bại"
          subTitle="Giao dịch không thành công hoặc bị hủy."
          extra={[
            <Button type="primary" onClick={() => navigate('/payment')}>
              Thử lại
            </Button>,
            <Button onClick={() => navigate('/')}>
              Về trang chủ
            </Button>
          ]} 
        />
      )}
    </div>
  );
};

export default OrderSuccessPage;