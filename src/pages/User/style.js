import { styled } from 'styled-components';

export const UserWrapper = styled.div`
    padding: 20px;
`;

export const UserHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
        font-size: 24px;
        color: #333;
    }

    .add-button {
        background: #4e73df;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
            background: #2e59d9;
        }
    }
`;

export const UserTable = styled.div`
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    overflow: hidden;

    table {
        width: 100%;
        border-collapse: collapse;

        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #e3e6f0;
        }

        th {
            background: #f8f9fc;
            color: #4e73df;
            font-weight: bold;
        }

        tr:hover {
            background: #f8f9fc;
        }

        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
        }

        .status {
            &.active {
                color: #1cc88a;
            }
            &.inactive {
                color: #e74a3b;
            }
        }
    }
`;

export const UserFilter = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    .search-box {
        flex: 1;
        input {
            width: 100%;
            padding: 10px;
            border: 1px solid #e3e6f0;
            border-radius: 5px;
        }
    }

    .filter-select {
        width: 200px;
        select {
            width: 100%;
            padding: 10px;
            border: 1px solid #e3e6f0;
            border-radius: 5px;
        }
    }
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 10px;

    button {
        padding: 5px 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        
        &.edit {
            background: #4e73df;
            color: white;
        }
        
        &.delete {
            background: #e74a3b;
            color: white;
        }
    }
`;