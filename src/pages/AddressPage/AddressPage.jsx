import React, { useState, useEffect } from 'react';
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
import { Spin, Modal, message } from 'antd';
import axiosClient from '../../apis/axiosClient';
import AddAddressModal from '../../components/AddAddressModal/AddAddressModal';

const AddressPage = () => {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const fetchAddresses = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get('/api/addresses');
            if (response.data.success) {
                setAddresses(response.data.data);
            }
        } catch (error) {
            console.error('Lỗi khi tải địa chỉ:', error);
            message.error('Không thể tải danh sách địa chỉ.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleAddAddress = () => {
        setIsModalVisible(true);
    };

    const handleAddressAdded = () => {
        setIsModalVisible(false);
        fetchAddresses();
    };

    const handleEditAddress = (id) => {
        navigate(`/profile/address/edit/${id}`);
    };

    const handleDeleteAddress = (id) => {
        const addressToDelete = addresses.find(addr => addr._id === id);
        if (addressToDelete.isDefault) {
            message.warning('Bạn không thể xóa địa chỉ mặc định.');
            return;
        }

        Modal.confirm({
            title: 'Bạn có chắc muốn xóa địa chỉ này?',
            content: 'Hành động này không thể hoàn tác.',
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await axiosClient.delete(`/api/addresses/${id}`);
                    message.success('Xóa địa chỉ thành công!');
                    fetchAddresses();
                } catch (error) {
                    console.error('Lỗi khi xóa địa chỉ:', error);
                    message.error('Đã xảy ra lỗi khi xóa địa chỉ.');
                }
            }
        });
    };

    if (loading) {
        return (
            <WrapperContainer>
                <WrapperContent>
                    <WrapperSidebar>
                        <ProfileSidebar />
                    </WrapperSidebar>
                    <WrapperMainContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Spin size="large" />
                    </WrapperMainContent>
                </WrapperContent>
            </WrapperContainer>
        );
    }

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
                        {addresses.length === 0 ? (
                            <p>Bạn chưa có địa chỉ nào.</p>
                        ) : (
                            addresses.map(addr => (
                                <AddressItem key={addr._id}>
                                    <AddressInfo>
                                        <AddressName>
                                            {addr.fullName}
                                            {addr.isDefault && <DefaultBadge>Mặc định</DefaultBadge>}
                                        </AddressName>
                                        <AddressDetails>
                                            <span>Địa chỉ:</span> {`${addr.specificAddress}, ${addr.ward}, ${addr.district}, ${addr.province}`}
                                        </AddressDetails>
                                        <AddressDetails>
                                            <span>Điện thoại:</span> {addr.phone}
                                        </AddressDetails>
                                    </AddressInfo>
                                    <AddressActions>
                                        <a onClick={() => handleEditAddress(addr._id)}>Chỉnh sửa</a>
                                        <a onClick={() => handleDeleteAddress(addr._id)}>Xóa</a>
                                    </AddressActions>
                                </AddressItem>
                            ))
                        )}
                    </AddressList>
                </WrapperMainContent>
            </WrapperContent>

            <AddAddressModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onAddressAdded={handleAddressAdded}
            />
        </WrapperContainer>
    );
};

export default AddressPage;
