import { styled } from 'styled-components';

export const CategoryWrapper = styled.div`
    padding: 20px;
    background: #f8f9fc;
`;

export const SearchSection = styled.div`
    margin-bottom: 24px;

    .search-input {
        width: 100%;
        max-width: 300px;
        padding: 10px 15px;
        border: 1px solid #e3e6f0;
        border-radius: 5px;
        transition: all 0.3s;

        &:focus {
            outline: none;
            border-color: #4e73df;
            box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
        }
    }
`;
export const PageHeader = styled.div`
    margin-bottom: 24px;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

    .header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .page-title {
        margin: 0;
        color: #333;
        font-size: 24px;
        font-weight: 500;
    }

    .btn-primary {
        background: #4e73df;
        border: none;
        padding: 8px 20px;
        border-radius: 5px;
        color: white;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s;
        cursor: pointer;

        &:hover {
            background: #2e59d9;
            transform: translateY(-1px);
        }

        i {
            font-size: 14px;
        }
    }
`;

export const TableCard = styled.div`
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    overflow: hidden;
`;

export const TableResponsive = styled.div`
    overflow-x: auto;
    min-height: 300px;

    table {
        width: 100%;
        border-collapse: collapse;

        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #e3e6f0;
            vertical-align: middle;
        }

        th {
            background: #f8f9fc;
            color: #4e73df;
            font-weight: 600;
            white-space: nowrap;
        }

        td {
            color: #333;
        }

        tbody tr {
            transition: all 0.3s;

            &:hover {
                background: #f8f9fc;
            }
        }

        .category-id {
            font-family: monospace;
            color: #666;
            font-size: 0.9em;
        }

        .category-name {
            font-weight: 500;
        }

        .status-cell {
            .react-switch {
                vertical-align: middle;
            }
        }

        .actions-cell {
            text-align: right;
            white-space: nowrap;

            .btn {
                padding: 6px 12px;
                border-radius: 4px;
                border: none;
                margin-left: 8px;
                transition: all 0.3s;
                cursor: pointer;

                &.btn-warning {
                    background: #f6c23e;
                    color: white;

                    &:hover {
                        background: #dfa800;
                    }
                }

                &.btn-danger {
                    background: #e74a3b;
                    color: white;

                    &:hover {
                        background: #be2617;
                    }
                }

                i {
                    font-size: 14px;
                }
            }
        }
    }
`;

export const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;

    .spinner-border {
        color: #4e73df;
    }
`;

export const NoDataMessage = styled.div`
    text-align: center;
    padding: 40px;
    color: #666;
    font-style: italic;
`;

export const ModalContent = styled.div`
    .form-group {
        margin-bottom: 1rem;

        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
            font-weight: 500;
        }

        input {
            width: 100%;
            padding: 0.5rem 0.75rem;
            border: 1px solid #e3e6f0;
            border-radius: 4px;
            transition: all 0.3s;

            &:focus {
                outline: none;
                border-color: #4e73df;
                box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
            }
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