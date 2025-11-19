import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import {
    WrapperContainer,
    WrapperContent,
    WrapperSidebar,
    WrapperMainContent,
    PageTitle,
    Box,
    BoxHeader,
    BoxTitle,
    BoxAction,
    BoxContent,
    InfoRow,
    InfoLabel,
    InfoValue
} from './style'; // Tệp style này chỉ chứa các component này

const ProfilePage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            setUserData(JSON.parse(userString));
        } else {
            navigate('/sign-in');
        }
    }, [navigate]);

    if (!userData) {
        return <div>Đang tải...</div>;
    }

    const defaultShippingAddress = "Chưa thiết lập địa chỉ giao hàng mặc định.";
    const displayName = [userData.firstName, userData.lastName].filter(Boolean).join(' ').trim();
    const shouldShowDisplayName = Boolean(displayName);

    return (
        <WrapperContainer>
            <WrapperContent>
                <WrapperSidebar>
                    <ProfileSidebar />
                </WrapperSidebar>

                <WrapperMainContent>
                    <PageTitle>Tài khoản của tôi</PageTitle>

                    <Box>
                        <BoxHeader>
                            <BoxTitle>Thông tin tài khoản</BoxTitle>
                            <BoxAction onClick={() => navigate('/account-info')}>
                                Chỉnh sửa
                            </BoxAction>
                        </BoxHeader>
                        <BoxContent>
                            {shouldShowDisplayName && (
                                <InfoRow>
                                    <InfoValue>{displayName}</InfoValue>
                                </InfoRow>
                            )}
                            <InfoRow>
                                <InfoValue>{userData.email}</InfoValue>
                            </InfoRow>
                        </BoxContent>
                    </Box>

                    <Box>
                        <BoxHeader>
                            <BoxTitle>Sổ địa chỉ</BoxTitle>
                            <BoxAction onClick={() => navigate('/address')}>
                                Quản lý địa chỉ
                            </BoxAction>
                        </BoxHeader>
                        <BoxContent>
                            <InfoRow>
                                <InfoLabel>Địa chỉ giao hàng mặc định:</InfoLabel>
                                <InfoValue>{defaultShippingAddress}</InfoValue>
                            </InfoRow>
                        </BoxContent>
                    </Box>
                </WrapperMainContent>
            </WrapperContent>
        </WrapperContainer>
    );
};

export default ProfilePage;