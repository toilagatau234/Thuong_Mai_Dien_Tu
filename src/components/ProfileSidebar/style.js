import styled from 'styled-components';

export const SidebarWrapper = styled.div`
    padding: 20px;
    background-color: #fff;
    border-radius: 8px 0 0 8px; /* Bo tròn góc bên trái */
`;

export const MenuTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0 0 15px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
`;

export const MenuList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const MenuItem = styled.li`
    padding: 12px 15px;
    font-size: 15px;
    font-weight: 500;
    color: #555;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #f5f5f5;
    }

    /* Style cho mục đang được chọn (active) */
    &.active {
        background-color: #326e51; /* Màu xanh lá chủ đạo */
        color: #fff;
        font-weight: 600;
    }
`;