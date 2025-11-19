import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal, Form, Input, Select, message, Space, Popconfirm, Typography, Spin } from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EnvironmentOutlined, 
  HomeOutlined, 
  BankOutlined, 
  StarFilled 
} from '@ant-design/icons';
import styled from 'styled-components';

const AddressBookContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledAddressList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const AddressCard = styled.div`
  border: 1px solid ${props => props.$isDefault ? '#1890ff' : '#f0f0f0'};
  border-width: ${props => props.$isDefault ? '2px' : '1px'};
  border-radius: 8px;
  padding: 16px;
  position: relative;
  background: #fff;
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
`;

const AddressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const DefaultBadge = styled.span`
  background: #1890ff;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px 0;
  color: #999;
  
  .icon {
    font-size: 48px;
    margin-bottom: 16px;
    display: block;
  }
`;

const AddressActions = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 0;
  transition: opacity 0.3s;
  
  ${AddressCard}:hover & {
    opacity: 1;
  }
`;

const { Option } = Select;

const AddressBook = () => {
    const [form] = Form.useForm();
    const [addresses, setAddresses] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [provinces] = useState([
        { id: 1, name: 'Hồ Chí Minh' },
        { id: 2, name: 'Hà Nội' },
        { id: 3, name: 'Đà Nẵng' },
    ]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const fetchAddresses = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/addresses', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();
            if (result.success) {
                setAddresses(result.data || []);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách địa chỉ:', error);
            message.error('Có lỗi xảy ra khi tải địa chỉ');
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses]);

    const handleAddAddress = () => {
        setEditingAddress(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        form.setFieldsValue({
            fullName: address.fullName,
            phone: address.phone,
            province: address.province,
            district: address.district,
            ward: address.ward,
            specificAddress: address.specificAddress,
            type: address.type,
            isDefault: address.isDefault
        });
        setIsModalVisible(true);
    };

    const handleDeleteAddress = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/addresses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const result = await response.json();
            if (result.success) {
                message.success('Xóa địa chỉ thành công');
                fetchAddresses();
            }
        } catch (error) {
            console.error('Lỗi khi xóa địa chỉ:', error);
            message.error('Có lỗi xảy ra khi xóa địa chỉ');
        }
    };

    const handleSetDefault = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/addresses/${id}/set-default`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const result = await response.json();
            if (result.success) {
                message.success('Đã đặt làm địa chỉ mặc định');
                fetchAddresses();
            }
        } catch (error) {
            console.error('Lỗi khi đặt địa chỉ mặc định:', error);
            message.error('Có lỗi xảy ra khi đặt địa chỉ mặc định');
        }
    };

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const url = editingAddress 
                ? `http://localhost:8080/api/addresses/${editingAddress._id}`
                : 'http://localhost:8080/api/addresses';
            
            const method = editingAddress ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(values)
            });
            
            const result = await response.json();
            
            if (result.success) {
                message.success(editingAddress ? 'Cập nhật địa chỉ thành công' : 'Thêm địa chỉ mới thành công');
                setIsModalVisible(false);
                fetchAddresses();
            } else {
                throw new Error(result.message || 'Có lỗi xảy ra');
            }
        } catch (error) {
            console.error('Lỗi khi lưu địa chỉ:', error);
            message.error(error.message || 'Có lỗi xảy ra khi lưu địa chỉ');
        } finally {
            setLoading(false);
        }
    };

    const handleProvinceChange = (value) => {
        setDistricts([{ id: 1, name: 'Quận 1' }, { id: 2, name: 'Quận 3' }]);
        setWards([]);
    };

    const handleDistrictChange = (value) => {
        setWards([{ id: 1, name: 'Phường Bến Nghé' }, { id: 2, name: 'Phường Bến Thành' }]);
    };

    const formatPhoneNumber = (phone) => {
        if (!phone) return '';
        return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    };

    const isDefaultAddress = (address) => {
        return address.isDefault ? ' (Mặc định)' : '';
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const getAddressIcon = (type) => {
        switch (type) {
            case 'home':
                return <HomeOutlined style={{ marginRight: 8, color: '#1890ff' }} />;
            case 'office':
                return <BankOutlined style={{ marginRight: 8, color: '#52c41a' }} />;
            default:
                return <EnvironmentOutlined style={{ marginRight: 8, color: '#722ed1' }} />;
        }
    };

    const getAddressTypeName = (type) => {
        switch (type) {
            case 'home':
                return 'Nhà riêng';
            case 'office':
                return 'Công ty';
            default:
                return 'Khác';
        }
    };

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Spin size="large" />
                <div>Đang tải địa chỉ...</div>
            </div>
        );
    }

    return (
        <AddressBookContainer>
            <AddressHeader>
                <Typography.Title level={4} style={{ margin: 0 }}>Sổ địa chỉ của tôi</Typography.Title>
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    onClick={handleAddAddress}
                >
                    Thêm địa chỉ mới
                </Button>
            </AddressHeader>

            <StyledAddressList>
                {addresses.map(address => (
                    <AddressCard 
                        key={address._id}
                        $isDefault={address.isDefault}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                            {getAddressIcon(address.type)}
                            <span style={{ fontWeight: 500 }}>{getAddressTypeName(address.type)}</span>
                            {address.isDefault && (
                                <DefaultBadge>
                                    <StarFilled style={{ marginRight: 4, fontSize: 12 }} />
                                    Mặc định
                                </DefaultBadge>
                            )}
                        </div>
                        
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{address.fullName}</div>
                            <div style={{ color: '#666' }}>{formatPhoneNumber(address.phone)}</div>
                        </div>
                        
                        <div style={{ color: '#666', marginBottom: 16, lineHeight: 1.5 }}>
                            <div>{address.specificAddress}</div>
                            <div>{[address.ward, address.district, address.province].filter(Boolean).join(', ')}</div>
                        </div>
                        
                        <AddressActions>
                            <Space>
                                <Button 
                                    size="small" 
                                    icon={<EditOutlined />} 
                                    onClick={() => handleEditAddress(address)}
                                >
                                    Sửa
                                </Button>
                                <Popconfirm
                                    title={`Bạn có chắc muốn xóa địa chỉ này${isDefaultAddress(address)}?`}
                                    onConfirm={() => handleDeleteAddress(address._id)}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button size="small" danger icon={<DeleteOutlined />}>
                                        Xóa
                                    </Button>
                                </Popconfirm>
                                {!address.isDefault && (
                                    <Button 
                                        size="small" 
                                        type="link" 
                                        icon={<EnvironmentOutlined />} 
                                        onClick={() => handleSetDefault(address._id)}
                                    >
                                        Mặc định
                                    </Button>
                                )}
                            </Space>
                        </AddressActions>
                    </AddressCard>
                ))}
                
                {addresses.length === 0 && (
                    <EmptyState>
                        <div className="icon">📭</div>
                        <div style={{ marginBottom: 16, fontSize: 16 }}>Bạn chưa có địa chỉ nào</div>
                        <Button type="primary" onClick={handleAddAddress}>
                            Thêm địa chỉ mới
                        </Button>
                    </EmptyState>
                )}
            </StyledAddressList>

            <Modal
                title={editingAddress ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={700}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        type: 'home',
                        isDefault: false
                    }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Form.Item
                            name="fullName"
                            label="Họ và tên"
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                        >
                            <Input placeholder="Nhập họ và tên" />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Số điện thoại"
                            rules={[
                                { required: true, message: 'Vui lòng nhập số điện thoại' },
                                { pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/, message: 'Số điện thoại không hợp lệ' }
                            ]}
                        >
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>

                        <Form.Item
                            name="province"
                            label="Tỉnh/Thành phố"
                            rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}
                        >
                            <Select 
                                placeholder="Chọn tỉnh/thành phố"
                                onChange={handleProvinceChange}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {provinces.map(province => (
                                    <Option key={province.id} value={province.name}>
                                        {province.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="district"
                            label="Quận/Huyện"
                            rules={[{ required: true, message: 'Vui lòng chọn quận/huyện' }]}
                        >
                            <Select 
                                placeholder="Chọn quận/huyện"
                                onChange={handleDistrictChange}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={!form.getFieldValue('province')}
                            >
                                {districts.map(district => (
                                    <Option key={district.id} value={district.name}>
                                        {district.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="ward"
                            label="Phường/Xã"
                            rules={[{ required: true, message: 'Vui lòng chọn phường/xã' }]}
                        >
                            <Select 
                                placeholder="Chọn phường/xã"
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={!form.getFieldValue('district')}
                            >
                                {wards.map(ward => (
                                    <Option key={ward.id} value={ward.name}>
                                        {ward.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="type"
                            label="Loại địa chỉ"
                        >
                            <Select>
                                <Option value="home">Nhà riêng</Option>
                                <Option value="office">Công ty</Option>
                                <Option value="other">Khác</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="specificAddress"
                        label="Địa chỉ cụ thể"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể' }]}
                    >
                        <Input.TextArea rows={3} placeholder="Ví dụ: Số nhà, đường, tổ dân phố..." />
                    </Form.Item>

                    <Form.Item
                        name="isDefault"
                        valuePropName="checked"
                    >
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                loading={loading}
                                style={{ marginRight: '16px' }}
                            >
                                {editingAddress ? 'Cập nhật' : 'Thêm mới'}
                            </Button>
                            <Button onClick={handleCancel}>Hủy</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </AddressBookContainer>
    );
};

export default React.memo(AddressBook);