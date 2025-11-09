import { styled } from 'styled-components';

export const SidebarContainer = styled.div`
    width: 260px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background: #fff;
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: width 0.3s;
    padding-top: 60px;

    &.condensed {
        width: 80px;
        
        .menu-title {
            visibility: hidden;
        }

        .sidebar-menu ul li a span {
            display: none;
        }

        .sidebar-menu ul li a i {
            margin-right: 0;
        }
    }
`;

export const SidebarTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: transparent;
`;

export const ToggleBtn = styled.button`
    background: none;
    border: none;
    color: #666;
    font-size: 18px;
    cursor: pointer;
`;

export const SidebarLogo = styled.div`
    .logo img {
        height: 36px;
    }
`;

export const SidebarFooter = styled.div`
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    padding: 0 20px;
    text-align: center;

    .sidebar-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 6px;

        &:hover { background: rgba(78,115,223,0.06); color: #4e73df; }
    }
`;

export const SidebarInner = styled.div`
    height: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
    }
`;

export const SidebarMenu = styled.div`
    padding: 20px 0;
`;

export const MenuTitle = styled.li`
    color: #333;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 25px;
    text-transform: uppercase;
    margin-bottom: 5px;
`;

export const MenuItem = styled.li`
    position: relative;
    margin-bottom: 5px;

    a {
        display: flex;
        align-items: center;
        padding: 10px 25px;
        color: #666;
        transition: all 0.3s;
        text-decoration: none;

        i {
            font-size: 18px;
            margin-right: 10px;
            width: 20px;
            text-align: center;
        }

        span {
            font-size: 14px;
        }

        &:hover, &.active {
            color: #4e73df;
            background: rgba(78, 115, 223, 0.1);
        }

        &.active {
            font-weight: 600;
        }
    }
`;

export const MenuList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;