import { styled } from 'styled-components';
import AdminPageWrapper from '../../components/PageLayout.style';

export const OrderWrapper = styled(AdminPageWrapper)`
    padding: 30px;
`;

export const OrderHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    h2 {
        font-size: 30px;
        font-weight: 700;
        color: #333;
    }
`;

export const OrderFilters = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 30px;

    .search-box {
        flex: 1;
        input {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #e3e6f0;
            border-radius: 8px;
            font-size: 16px;
        }
    }

    .filter-select {
        width: 250px;
        select {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #e3e6f0;
            border-radius: 8px;
            font-size: 16px;
        }
    }
`;

export const OrderTable = styled.div`
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    overflow: hidden;

    table {
        width: 100%;
        border-collapse: collapse;

        th, td {
            padding: 18px 20px; /* Padding to */
            text-align: left;
            border-bottom: 1px solid #e3e6f0;
            font-size: 16px; /* Chữ 16px */
            vertical-align: middle;
        }

        th {
            background: #f8f9fc;
            color: #00d165;
            font-weight: 700;
            font-size: 16px;
        }

        tr:hover {
            background: #f8f9fc;
        }

        .status {
            padding: 8px 15px; /* Badge to hơn */
            border-radius: 20px;
            font-size: 14px; /* Chữ trong badge to hơn */
            font-weight: 600;
            display: inline-block;

            &.pending { background: #f6c23e; color: #fff; }
            &.processing { background: #00d165; color: #fff; }
            &.completed, &.delivered { background: #1cc88a; color: #fff; }
            &.cancelled { background: #e74a3b; color: #fff; }
        }
        
        /* Dropdown chọn trạng thái to hơn */
        .form-select-sm {
            padding: 8px 12px;
            font-size: 15px;
        }
    }
`;

export const OrderDetails = styled.div`
    padding: 30px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0,0,0,0.05);
    margin-top: 30px;

    h3 {
        margin-bottom: 25px;
        color: #333;
        font-size: 24px;
        font-weight: 700;
    }

    .order-info {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
        margin-bottom: 30px;

        .info-item {
            .label {
                color: #666;
                margin-bottom: 8px;
                font-size: 15px;
            }
            .value {
                font-weight: 700;
                color: #333;
                font-size: 18px; /* Giá trị thông tin to rõ */
            }
        }
    }
`;