import React, { useState, useEffect } from 'react';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import {
    WrapperContainer,
    WrapperContent,
    WrapperSidebar,
    WrapperMainContent,
    PageTitle
} from '../ProfilePage/style'; 
import {
    ProductList,
    ProductCard,
    ProductImage,
    ProductInfo,
    ProductName,
    ProductPrice
} from './style';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products'); 
                const data = await response.json();
                
                if (Array.isArray(data.data)) {
                    setProducts(data.data); 
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error("Không thể tải sản phẩm:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const getProductVariation = (product) => {
        if (!product || !product.variations || product.variations.length === 0) {
            return { price: 0, image: 'https://via.placeholder.com/200' }; 
        }
        const firstVariation = product.variations[0];
        return {
            price: firstVariation.price || 0,
            image: firstVariation.image
        };
    };

    return (
        <WrapperContainer>
            <WrapperContent>
                <WrapperSidebar>
                    <ProfileSidebar />
                </WrapperSidebar>

                <WrapperMainContent>
                    <PageTitle>Tất cả sản phẩm</PageTitle>
                    
                    {loading ? (
                        <p>Đang tải sản phẩm...</p>
                    ) : (
                        <ProductList>
                            {products
                                .filter(product => product && product._id) // Lọc bỏ sản phẩm lỗi
                                .map(product => {
                                    const { price, image } = getProductVariation(product);
                                    return (
                                        <ProductCard 
                                            key={product._id} 
                                            // SỬA LỖI Ở ĐÂY: Trỏ đến /product-detail/${product._id}
                                            to={`/product-detail/${product._id}`} 
                                        >
                                            <ProductImage src={image} alt={product.name} />
                                            
                                            <ProductInfo>
                                                <ProductName>{product.name}</ProductName>
                                                <ProductPrice>
                                                    {price ? 
                                                        price.toLocaleString('vi-VN') + ' đ' : 
                                                        'Đang cập nhật'
                                                    }
                                                </ProductPrice>
                                            </ProductInfo>
                                        </ProductCard>
                                    );
                            })}
                        </ProductList>
                    )}
                </WrapperMainContent>
            </WrapperContent>
        </WrapperContainer>
    );
};

export default ProductsPage;