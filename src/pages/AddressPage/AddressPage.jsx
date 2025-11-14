import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import {
    WrapperContainer,
    WrapperContent,
    WrapperSidebar,
    WrapperMainContent,
    PageTitle
} from '../ProfilePage/style';
import {
    AddressHeader,
    AddButton,
    AddressList,
    AddressItem,
    AddressInfo,
    AddressName,
    AddressDetails,
    AddressActions,
    DefaultBadge
} from './style';

const mockAddresses = [
    { id: 1, name: 'Anh Tú', address: '123 Đường ABC, Phường 1, Quận 1, TP. HCM', phone: '0912345678', isDefault: true },
    { id: 2, name: 'Anh Tú', address: '456 Đường XYZ, Phường 2, Quận 2, TP. HCM', phone: '0987654321', isDefault: false },
];

const AddressPage = () => {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState(mockAddresses);

    const handleAddAddress = () => {
        console.log("Add new address");
    };

    const handleEditAddress = (id) => {
        console.log("Edit address:", id);
    };

    const handleDeleteAddress = (id) => {
        const addressToDelete = addresses.find(addr => addr.id === id);
        if (addressToDelete.isDefault) {
            alert("Bạn không thể xóa địa chỉ mặc định.");
            return;
        }
        if (window.confirm("Bạn có chắc muốn xóa địa chỉ này?")) {
            setAddresses(prev => prev.filter(addr => addr.id !== id));
        }
    };

    return (
        <WrapperContainer>
            <WrapperContent>
                <WrapperSidebar>
                    <ProfileSidebar />
                </WrapperSidebar>
                <WrapperMainContent>
                    <PageTitle>Sổ địa chỉ</PageTitle>
                    <AddressHeader>
                        <AddButton onClick={handleAddAddress}>Thêm địa chỉ mới</AddButton>
                    </AddressHeader>

                    <AddressList>
                        {addresses.map(addr => (
                            <AddressItem key={addr.id}>
                                <AddressInfo>
                                    <AddressName>
                                        {addr.name}
                                        {addr.isDefault && <DefaultBadge>Mặc định</DefaultBadge>}
                                    </AddressName>
                                    <AddressDetails>
                                        <span>Địa chỉ:</span> {addr.address}
                                    </AddressDetails>
                                    <AddressDetails>
                                        <span>Điện thoại:</span> {addr.phone}
                                    </AddressDetails>
                                </AddressInfo>
                                <AddressActions>
                                    <a onClick={() => handleEditAddress(addr.id)}>Chỉnh sửa</a>
                                    <a onClick={() => handleDeleteAddress(addr.id)}>Xóa</a>
                                </AddressActions>
                            </AddressItem>
                        ))}
                    </AddressList>
                </WrapperMainContent>
            </WrapperContent>
        </WrapperContainer>
    );
};

export default AddressPage;