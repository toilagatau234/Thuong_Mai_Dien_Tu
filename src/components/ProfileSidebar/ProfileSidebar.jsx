import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    SidebarWrapper,
    MenuTitle,
    MenuList,
    MenuItem
} from './style'; // Dòng này sẽ hết lỗi sau khi bạn tạo file style.js

const ProfileSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Định nghĩa các link trong menu
    const menuItems = [
        { key: '/profile', label: 'Tài khoản của tôi' },
        { key: '/my-orders', label: 'Lịch sử mua hàng' },
        { key: '/wishlist', label: 'Sản phẩm yêu thích' },
        { key: '/address', label: 'Sổ địa chỉ' },
        { key: '/account-info', label: 'Thông tin tài khoản' },
        { key: '/change-password', label: 'Đổi mật khẩu' },
    ];

    return (
        <SidebarWrapper>
            <MenuTitle>Tài khoản</MenuTitle>
            <MenuList>
                {menuItems.map(item => (
                    <MenuItem
                        key={item.key}
                        className={location.pathname === item.key ? 'active' : ''}
                        onClick={() => navigate(item.key)}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </MenuList>
        </SidebarWrapper>
    );
};

export default ProfileSidebar;