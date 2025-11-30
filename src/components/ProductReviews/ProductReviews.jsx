import React, { useState, useEffect } from 'react';
import { Row, Col, Rate, Input, Button, List, Avatar, message, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosClient from '../../apis/axiosClient';

const { TextArea } = Input;

const ProductReviews = ({ product, onReviewSubmit }) => {
    const { id } = useParams();
    
    // --- 👇 SỬA ĐOẠN NÀY: LẤY USER THÔNG MINH HƠN 👇 ---
    const userRedux = useSelector((state) => state.user);
    
    // Lấy backup từ LocalStorage nếu Redux bị mất dữ liệu
    const [user, setUser] = useState(userRedux);

    useEffect(() => {
        // Ưu tiên Redux, nếu không có thì tìm trong LocalStorage
        if (userRedux && userRedux.id) {
            setUser(userRedux);
        } else {
            const userStorage = localStorage.getItem('user');
            if (userStorage) {
                try {
                    setUser(JSON.parse(userStorage));
                } catch (e) {
                    console.error("Lỗi parse user:", e);
                }
            }
        }
    }, [userRedux]);
    // ----------------------------------------------------
    
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        // Kiểm tra Token thay vì chỉ kiểm tra ID user
        const token = localStorage.getItem('access_token');

        if (!token) {
            message.warning('Vui lòng đăng nhập để đánh giá');
            return;
        }
        if (!comment.trim()) {
            message.error('Vui lòng nhập nội dung đánh giá');
            return;
        }

        setLoading(true);
        try {
            await axiosClient.post(`/api/products/${id}/reviews`, {
                rating,
                comment
            });
            message.success('Cảm ơn bạn đã đánh giá!');
            setComment('');
            setRating(5);
            if (onReviewSubmit) onReviewSubmit(); 
        } catch (error) {
            message.error(error.response?.data?.message || 'Lỗi khi gửi đánh giá');
        } finally {
            setLoading(false);
        }
    };

    const safeReviews = (product && product.reviews && Array.isArray(product.reviews)) 
        ? [...product.reviews].reverse() 
        : [];

    return (
        <div style={{ marginTop: '20px', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                Đánh giá sản phẩm ({product?.numReviews || 0})
            </h3>
            
            <Row gutter={[30, 30]}>
                <Col xs={24} md={14} style={{ borderRight: '1px solid #f0f0f0' }}>
                    <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '10px' }}>
                        {safeReviews.length === 0 ? (
                            <Empty description="Chưa có đánh giá nào. Hãy là người đầu tiên!" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        ) : (
                            <List
                                itemLayout="horizontal"
                                dataSource={safeReviews}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={
                                                item.avatar ? (
                                                    <Avatar src={item.avatar} size="large" />
                                                ) : (
                                                    <Avatar icon={<UserOutlined />} size="large" style={{ backgroundColor: '#87d068' }} />
                                                )
                                            }
                                            title={
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                                                    <Rate disabled defaultValue={item.rating} style={{ fontSize: '12px' }} />
                                                </div>
                                            }
                                            description={
                                                <div>
                                                    <p style={{ color: '#333', marginTop: '5px', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                                                        {item.comment}
                                                    </p>
                                                    <span style={{ fontSize: '12px', color: '#999' }}>
                                                        {item.createdAt ? new Date(item.createdAt).toLocaleString('vi-VN') : 'Vừa xong'}
                                                    </span>
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        )}
                    </div>
                </Col>

                <Col xs={24} md={10}>
                    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
                        <h4 style={{ marginBottom: '15px' }}>Viết đánh giá của bạn</h4>
                        
                        <div style={{ marginBottom: '15px' }}>
                            <span style={{ marginRight: '10px' }}>Chất lượng sản phẩm: </span>
                            <Rate value={rating} onChange={setRating} />
                        </div>
                        
                        <TextArea 
                            rows={4} 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..."
                            style={{ marginBottom: '15px' }}
                        />
                        
                        {/* 👇 SỬA ĐIỀU KIỆN DISABLED NÚT BẤM 👇 */}
                        <Button 
                            type="primary" 
                            onClick={handleSubmit} 
                            loading={loading} 
                            block
                            // Chỉ disable nếu không có token trong localStorage
                            disabled={!localStorage.getItem('access_token')} 
                            style={{ 
                                height: '40px', 
                                background: '#326e51', 
                                borderColor: '#326e51', 
                                fontWeight: 'bold',
                                opacity: !localStorage.getItem('access_token') ? 0.6 : 1 
                            }}
                        >
                            {localStorage.getItem('access_token') ? 'Gửi đánh giá' : 'Đăng nhập để đánh giá'}
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ProductReviews;