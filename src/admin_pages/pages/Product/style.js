import { styled } from 'styled-components';
import AdminPageWrapper from '../../components/PageLayout.style';

export const ProductWrapper = styled(AdminPageWrapper)`
    padding: 30px;

    /* Nút thêm mới to hơn */
    .btn-primary {
        background: #00d165;
        border: none;
        padding: 12px 24px; 
        border-radius: 8px;
        color: white;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s;
        cursor: pointer;

        &:hover {
            background: #00b95a;
            transform: translateY(-2px);
        }
        i { font-size: 18px; }
    }

    /* Bảng dữ liệu thoáng hơn */
    .table {
        font-size: 16px; /* Chữ toàn bảng 16px */
        th {
            padding: 18px 15px;
            font-weight: 700;
            background-color: #f8f9fc;
        }
        td {
            padding: 18px 15px; /* Dãn dòng */
            vertical-align: middle;
        }
    }

    /* Item sản phẩm (ảnh + tên) */
    .product-item {
        display: flex;
        align-items: center;

        img {
            width: 80px;          /* Ảnh to hơn (cũ 70) */
            height: 80px;         /* Ảnh to hơn (cũ 70) */
            object-fit: cover;
            border-radius: 8px;
            border: 1px solid #eee;
            margin-right: 20px;   /* Cách tên xa hơn */
            background-color: #f9f9f9;
        }

        span {
            font-weight: 600;
            color: #333;
            font-size: 16px;
        }
    }
`;

export const ProductHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    h2 {
        font-size: 30px; /* Tiêu đề to */
        font-weight: 700;
        color: #333;
    }
`;

export const ProductFilters = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 30px;

    .search-box {
        flex: 1;
        input {
            width: 100%;
            padding: 12px 15px; /* Input cao hơn */
            border: 1px solid #e3e6f0;
            border-radius: 8px;
            font-size: 16px;
        }
    }

    .filter-select {
        width: 250px; /* Select rộng hơn */
        select {
            width: 100%;
            padding: 12px 15px; /* Select cao hơn */
            border: 1px solid #e3e6f0;
            border-radius: 8px;
            font-size: 16px;
        }
    }
`;
// ... (Giữ nguyên ProductGrid, ProductCard nếu bạn dùng dạng lưới, nhưng style trên chủ yếu fix dạng bảng)
export const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Card to hơn */
    gap: 24px;
`;
// ... Copy lại ProductCard cũ và tăng font-size nếu cần
export const ProductCard = styled.div`
    /* ...Code cũ... */
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    overflow: hidden;

    .product-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .product-info {
        padding: 15px;

        h3 { margin: 0 0 10px; color: #333; font-size: 18px; }
        .price { color: #00d165; font-weight: bold; margin-bottom: 10px; font-size: 16px; }
        .stock { color: #666; margin-bottom: 10px; font-size: 14px; }
    }
    .product-actions {
        padding: 15px;
        border-top: 1px solid #e3e6f0;
        display: flex;
        justify-content: space-between;
        button {
            padding: 8px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            &.edit { background: #00d165; color: white; }
            &.delete { background: #e74a3b; color: white; }
        }
    }
`;