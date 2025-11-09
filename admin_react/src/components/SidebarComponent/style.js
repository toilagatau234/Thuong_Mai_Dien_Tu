import { styled } from 'styled-components';

// Định nghĩa màu theme của bạn
const themeColor = '#00ff77da';
const themeColorSolid = '#00d165'; // Màu xanh lá solid đậm hơn cho chữ
const themeColorBgHover = 'rgba(0, 255, 119, 0.1)'; // Màu nền hover (10% alpha)
const themeColorBgActive = 'rgba(0, 255, 119, 0.15)'; // Màu nền active (15% alpha)

export const SidebarContainer = styled.div`
    width: 260px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background: #fff; /* === Giữ nền trắng === */
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: width 0.3s;
    padding-top: 0; /* === THAY ĐỔI: Bỏ padding-top === */
    display: flex;
    flex-direction: column;

    &.condensed {
        width: 80px;
        
        .menu-title {
            visibility: hidden;
            padding: 10px 0;
            span { display: none; }
        }

        /* Ẩn text khi thu gọn */
        .sidebar-menu ul li a span,
        .sidebar-footer span,
        .logo-text {
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
    justify-content: flex-start; /* === THAY ĐỔI: Căn trái logo === */
    padding: 0 20px; /* Thêm padding */
    height: 64px; /* Bằng chiều cao header */
    border-bottom: 1px solid #f0f0f0;
    flex-shrink: 0; /* Ngăn co lại */
    transition: justify-content 0.3s;
`;

// Xóa ToggleBtn

export const SidebarLogo = styled.div`
    width: 100%;
    a {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        
        img {
            height: 36px;
        }
        
        .logo-text {
            font-size: 1.15rem;
            font-weight: 600;
            color: #000;
            transition: all 0.3s;
            white-space: nowrap;
        }
    }
`;

export const SidebarFooter = styled.div`
    flex-shrink: 0; /* Ngăn co lại */
    border-top: 1px solid #f0f0f0;
    padding: 20px 0;
    text-align: center;

    .sidebar-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 6px;
        text-decoration: none;

        &:hover { 
            background: #f8f9fc; 
            color: ${themeColorSolid}; /* === THAY ĐỔI: Màu xanh lá === */
        }
        
        i { font-size: 16px; }
        span { font-size: 14px; white-space: nowrap; }
    }
`;

export const SidebarInner = styled.div`
    height: 100%;
    overflow-y: auto; /* Cho phép cuộn nội dung menu */
    overflow-x: hidden;
    flex: 1 1 auto; /* Quan trọng: cho phép co giãn */

    &::-webkit-scrollbar { width: 5px; }
    &::-webkit-scrollbar-track { background: #f1f1f1; }
    &::-webkit-scrollbar-thumb { background: #ccc; border-radius: 5px; }
    &::-webkit-scrollbar-thumb:hover { background: #888; }
`;

export const SidebarMenu = styled.div`
    padding: 20px 0;
`;

export const MenuTitle = styled.li`
    color: #999;
    font-size: 12px;
    font-weight: 600;
    padding: 10px 25px;
    text-transform: uppercase;
    margin-bottom: 5px;
    transition: all 0.3s;
    white-space: nowrap;
`;

export const MenuItem = styled.li`
    position: relative;
    margin-bottom: 2px;

    a {
        display: flex;
        align-items: center;
        padding: 12px 25px;
        color: #666; /* === THAY ĐỔI: Màu chữ xám === */
        transition: all 0.3s;
        text-decoration: none;
        white-space: nowrap;

        i {
            font-size: 16px;
            margin-right: 12px;
            width: 20px;
            text-align: center;
            color: #999; /* === THAY ĐỔI: Màu icon xám nhạt === */
            transition: all 0.3s;
        }

        span {
            font-size: 14px;
        }

        /* === THAY ĐỔI: Style cho hover === */
        &:hover {
            color: ${themeColorSolid};
            background: ${themeColorBgHover};

            i {
                color: ${themeColorSolid};
            }
        }
        
        /* === THAY ĐỔI: Style cho active === */
        &.active {
            color: ${themeColorSolid};
            background: ${themeColorBgActive};
            font-weight: 600;

            i {
                color: ${themeColorSolid};
            }
        }
    }
`;

export const MenuList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;