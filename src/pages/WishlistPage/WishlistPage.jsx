import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import {
    WrapperContainer,
    WrapperContent,
    WrapperSidebar,
    WrapperMainContent,
    PageTitle,
    Box
} from '../ProfilePage/style';
import {
    EmptyState,
    EmptyIcon,
    EmptyDescription,
    ContinueButton,
    WishlistGrid,
    WishlistCard,
    WishlistCardImage,
    WishlistCardName,
    WishlistPrice,
    WishlistCardActions,
    ViewButton,
    RemoveButton
} from './style';

const WishlistPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (!userString) {
            navigate('/sign-in');
            return;
        }
        const parsed = JSON.parse(userString);
        setUserData(parsed);
    }, [navigate]);

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!userData?._id) return;
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:8080/api/user/${userData._id}/wishlist`);
                setWishlist(res.data?.wishlist || []);
            } catch (error) {
                console.error('Lỗi tải wishlist:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [userData]);

    const handleContinueShopping = useCallback(() => {
        navigate('/products');
    }, [navigate]);

    const handleViewProduct = useCallback((productId) => {
        navigate(`/product-detail/${productId}`);
    }, [navigate]);

    const handleRemoveProduct = async (productId) => {
        if (!userData?._id) return;
        try {
            await axios.delete(`http://localhost:8080/api/user/${userData._id}/wishlist/${productId}`);
            setWishlist((prev) => prev.filter((item) => (item._id || item) !== productId));
        } catch (error) {
            console.error('Lỗi xóa sản phẩm yêu thích:', error);
        }
    };

    if (!userData && !loading) {
        return null;
    }

    return (
        <WrapperContainer>
            <WrapperContent>
                <WrapperSidebar>
                    <ProfileSidebar />
                </WrapperSidebar>
                <WrapperMainContent>
                    <PageTitle>Danh sách yêu thích</PageTitle>
                    {loading ? (
                        <Box style={{ padding: '20px' }}>Đang tải...</Box>
                    ) : wishlist.length === 0 ? (
                        <EmptyState>
                            <EmptyIcon>:(</EmptyIcon>
                            <EmptyDescription>
                                Hãy <span role="img" aria-label="heart">❤️</span> sản phẩm bạn yêu thích khi mua sắm để xem lại thuận tiện nhất
                            </EmptyDescription>
                            <ContinueButton type="primary" onClick={handleContinueShopping}>
                                Tiếp tục mua sắm
                            </ContinueButton>
                        </EmptyState>
                    ) : (
                        <WishlistGrid>
                            {wishlist.map((product) => {
                                const productId = product._id || product;
                                const name = product.name || 'Sản phẩm';
                                const price = product.price || product.salePrice;
                                const imageSrc = product.images?.[0]?.url || product.images?.[0] || '/placeholder.png';
                                return (
                                    <WishlistCard key={productId}>
                                        <WishlistCardImage>
                                            <img src={imageSrc} alt={name} />
                                        </WishlistCardImage>
                                        <WishlistCardName>{name}</WishlistCardName>
                                        <WishlistPrice>
                                            {price ? price.toLocaleString('vi-VN') + 'đ' : 'Liên hệ'}
                                        </WishlistPrice>
                                        <WishlistCardActions>
                                            <ViewButton type="primary" onClick={() => handleViewProduct(productId)}>
                                                Xem chi tiết
                                            </ViewButton>
                                            <RemoveButton onClick={() => handleRemoveProduct(productId)}>
                                                Xóa
                                            </RemoveButton>
                                        </WishlistCardActions>
                                    </WishlistCard>
                                );
                            })}
                        </WishlistGrid>
                    )}
                </WrapperMainContent>
            </WrapperContent>
        </WrapperContainer>
    );
};

export default WishlistPage;
