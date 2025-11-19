import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Result, Spin } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { removeSelectedItems } from '../../redux/cartSlice'; 

const VnpayReturnPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [status, setStatus] = useState('processing');
    const [title, setTitle] = useState('Đang xử lý kết quả thanh toán...');
    const [subTitle, setSubTitle] = useState('');

    useEffect(() => {
        const verifyPayment = async () => {
            const queryParams = new URLSearchParams(location.search);
            const txnRef = queryParams.get('vnp_TxnRef'); // This is the Order ID

            if (!txnRef) {
                setStatus('error');
                setTitle('Giao dịch không hợp lệ');
                setSubTitle('Không tìm thấy mã tham chiếu đơn hàng trong phản hồi.');
                return;
            }

            // CRITICAL: Securely verify the transaction status with your backend.
            // The backend should have an endpoint that takes the txnRef,
            // finds the order in the database, and returns its true paymentStatus.
            // This prevents users from faking a successful payment by manipulating the URL.
            try {
                // This is a hypothetical endpoint. You must implement it on your backend.
                // Example: router.get('/orders/status/:orderId', ...)
                const response = await fetch(`http://localhost:8081/api/orders/status/${txnRef}`);
                const orderDetails = await response.json();

                if (response.ok) {
                    if (orderDetails.paymentStatus === 'success') {
                        setStatus('success');
                        setTitle('Thanh toán thành công!');
                        setSubTitle(`Cảm ơn bạn đã mua hàng. Mã đơn hàng: ${txnRef}.`);
                        dispatch(removeSelectedItems());
                    } else {
                        setStatus('error');
                        setTitle('Thanh toán thất bại');
                        setSubTitle('Giao dịch không thành công hoặc đã bị hủy.');
                    }
                } else {
                    setStatus('error');
                    setTitle('Lỗi xác thực đơn hàng');
                    setSubTitle(orderDetails.message || 'Không thể lấy thông tin chi tiết đơn hàng từ máy chủ.');
                }

            } catch (error) {
                console.error('Verification API error:', error);
                setStatus('error');
                setTitle('Lỗi kết nối');
                setSubTitle('Không thể kết nối đến máy chủ để xác thực thanh toán. Vui lòng liên hệ bộ phận hỗ trợ.');
            }
        };

        verifyPayment();
    }, [location, dispatch]);

    const handleGoHome = () => {
        navigate('/');
    };
    
    const handleGoToMyOrders = () => {
        navigate('/my-orders'); // Chuyển đến trang xem lại đơn hàng
    };

    if (status === 'processing') {
        return <Spin size="large" style={{ display: 'block', marginTop: '100px' }} />;
    }

    return (
        <div style={{ padding: '50px 0', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Result
                icon={status === 'success' ? <CheckCircleOutlined /> : <CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
                status={status}
                title={title}
                subTitle={subTitle}
                extra={[
                    <Button type="primary" key="home" onClick={handleGoHome}>
                        Tiếp tục mua hàng
                    </Button>,
                    status === 'success' && (
                        <Button key="orders" onClick={handleGoToMyOrders}>
                            Xem đơn hàng
                        </Button>
                    )
                ]}
            />
        </div>
    );
};

export default VnpayReturnPage;