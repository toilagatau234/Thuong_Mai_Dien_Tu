import { styled } from 'styled-components';
import AdminPageWrapper from '../../components/PageLayout.style';

export const UserWrapper = styled(AdminPageWrapper)`
    padding: 30px;

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
        transition: all 0.3s;
        cursor: pointer;
        &:hover { background: #00b95a; transform: translateY(-2px); }
        i { font-size: 18px; }
    }

    .table {
        font-size: 16px;
        td { vertical-align: middle; padding: 18px 15px; }
        th { padding: 18px 15px; font-weight: 700; }
    }

    .user-item {
        display: flex;
        align-items: center;
        gap: 15px; 

        img {
            width: 50px; /* Avatar to hơn (cũ 40) */
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            border: 1px solid #eee;
            background-color: #f1f1f1;
        }

        .user-name {
            font-size: 16px; /* Tên to hơn */
            font-weight: 600;
            color: #333;
        }
    }
`;

export const UserPageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    h2 { font-size: 30px; color: #333; font-weight: 700; }
`;

export const UserTable = styled.div`
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    overflow: hidden;

    table {
        width: 100%;
        border-collapse: collapse;

        th, td {
            padding: 18px 20px;
            text-align: left;
            border-bottom: 1px solid #e3e6f0;
            font-size: 16px;
        }

        th {
            background: #f8f9fc;
            color: #00d165;
            font-weight: 700;
        }

        tr:hover { background: #f8f9fc; }
    }
`;

export const UserFilter = styled.div`
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
        select { width: 100%; padding: 12px 15px; border: 1px solid #e3e6f0; border-radius: 8px; font-size: 16px; }
    }
`;
// ...ActionButtons giữ nguyên, chỉ cần chỉnh padding nếu muốn
export const ActionButtons = styled.div`
    display: flex;
    gap: 10px;
    button {
        padding: 8px 12px; /* Nút hành động to dễ bấm */
        font-size: 14px;
        border: none; border-radius: 4px; cursor: pointer;
        &.edit { background: #00d165; color: white; }
        &.delete { background: #e74a3b; color: white; }
    }
`;