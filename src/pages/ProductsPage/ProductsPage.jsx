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

import { Pagination } from 'antd';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    // Fixed page size to 8 products per page
    const [pageSize, setPageSize] = useState(8);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/products?page=${currentPage}&limit=8`);
                const data = await response.json();

                if (Array.isArray(data.data)) {
                    setProducts(data.data);
                    setTotal(data.total);
                    // Always set pageSize to 8 to match the limit in the API call
                    setPageSize(8);
                } else {
                    setProducts([]);
                    setTotal(0);
                }
            } catch (error) {
                console.error("Không thể tải sản phẩm:", error);
                setProducts([]);
                setTotal(0);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
                        <>
                            <ProductList>
                                {products
                                    .filter(product => product && product._id)
                                    .map(product => {
                                        const { price, image } = getProductVariation(product);
                                        return (
                                            <ProductCard
                                                key={product._id}
                                                to={`/product-detail/${product._id}`}
                                            >
                                                <ProductImage src={image} alt={product.name} />
                                                <ProductInfo>
                                                    <ProductName>{product.name}</ProductName>
                                                    <ProductPrice>
                                                        {price
                                                            ? price.toLocaleString('vi-VN') + ' đ'
                                                            : 'Đang cập nhật'}
                                                    </ProductPrice>
                                                </ProductInfo>
                                            </ProductCard>
                                        );
                                    })}
                            </ProductList>

                            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                <Pagination
                                    current={currentPage}
                                    total={total}
                                    pageSize={pageSize}
                                    onChange={handlePageChange}
                                />
                            </div>
                        </>
                    )}
                </WrapperMainContent>
            </WrapperContent>
        </WrapperContainer>
    );
};

export default ProductsPage;
