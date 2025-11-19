import React, { useState } from 'react';
import { Modal, Form, Input, Checkbox, Button, message } from 'antd';
import axiosClient from '../../apis/axiosClient';

const AddAddressModal = ({ visible, onClose, onAddressAdded }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axiosClient.post('/api/addresses', values);
            if (response.data.success) {
                message.success('Thêm địa chỉ mới thành công!');
                form.resetFields();
                onAddressAdded();
            } else {
                message.error(response.data.message || 'Có lỗi xảy ra');
            }
        } catch (error) {
            console.error('Lỗi khi thêm địa chỉ:', error);
            message.error(error.response?.data?.message || 'Không thể kết nối đến máy chủ');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="Địa chỉ mới"
            visible={visible}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ isDefault: false, type: 'home' }}
            >
                <Form.Item
                    name="province"
                    label="Tỉnh/Thành phố"
                    rules={[{ required: true, message: 'Vui lòng nhập tỉnh/thành phố!' }]}
                >
                    <Input placeholder="TP. Hồ Chí Minh" />
                </Form.Item>

                <Form.Item
                    name="district"
                    label="Quận/Huyện"
                    rules={[{ required: true, message: 'Vui lòng nhập quận/huyện!' }]}
                >
                    <Input placeholder="Quận 1" />
                </Form.Item>

                <Form.Item
                    name="ward"
                    label="Phường/Xã"
                    rules={[{ required: true, message: 'Vui lòng nhập phường/xã!' }]}
                >
                    <Input placeholder="Phường Bến Nghé" />
                </Form.Item>

                <Form.Item
                    name="specificAddress"
                    label="Địa chỉ cụ thể"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể!' }]}
                >
                    <Input placeholder="123 Đường Lê Lợi" />
                </Form.Item>

                <Form.Item name="isDefault" valuePropName="checked">
                    <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
                </Form.Item>

                <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
                    <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                        Hủy bỏ
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Lưu
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddAddressModal;
