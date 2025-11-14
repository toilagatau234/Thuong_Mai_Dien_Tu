import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Radio, DatePicker, Button, message } from 'antd';
import dayjs from 'dayjs';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import {
    WrapperContainer,
    WrapperContent,
    WrapperSidebar,
    WrapperMainContent,
    PageTitle
} from '../ProfilePage/style';
import {
    FormWrapper,
    FormRow,
    FormLabel,
    FormControl,
    SaveButton
} from './style';

const AccountInfoPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            setUserData(user);

            form.setFieldsValue({
                firstName: user.firstName,
                phone: user.phone,
                gender: user.gender,
                birthday: user.birthday ? dayjs(user.birthday) : null
            });
        } else {
            navigate('/sign-in');
        }
    }, [navigate, form]);

    const onFinish = (values) => {
        console.log('Thông tin cập nhật:', values);
        
        const updatedUser = { ...userData, ...values };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUserData(updatedUser);

        message.success('Cập nhật hồ sơ thành công!');
    };

    if (!userData) {
        return <div>Đang tải...</div>;
    }

    return (
        <WrapperContainer>
            <WrapperContent>
                <WrapperSidebar>
                    <ProfileSidebar />
                </WrapperSidebar>

                <WrapperMainContent>
                    <PageTitle>Thông tin tài khoản</PageTitle>

                    <FormWrapper form={form} onFinish={onFinish} layout="vertical">
                        <FormRow>
                            <FormLabel>Họ tên</FormLabel>
                            <FormControl>
                                <Form.Item 
                                    name="firstName"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </FormControl>
                        </FormRow>

                        <FormRow>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input size="large" value={userData.email} disabled />
                            </FormControl>
                        </FormRow>

                        <FormRow>
                            <FormLabel>Số điện thoại</FormLabel>
                            <FormControl>
                                <Form.Item 
                                    name="phone"
                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </FormControl>
                        </FormRow>

                        <FormRow>
                            <FormLabel>Giới tính</FormLabel>
                            <FormControl>
                                <Form.Item name="gender">
                                    <Radio.Group>
                                        <Radio value="male">Nam</Radio>
                                        <Radio value="female">Nữ</Radio>
                                        <Radio value="other">Khác</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </FormControl>
                        </FormRow>

                        <FormRow>
                            <FormLabel>Ngày sinh</FormLabel>
                            <FormControl>
                                <Form.Item name="birthday">
                                    <DatePicker 
                                        size="large" 
                                        style={{ width: '100%' }}
                                        format="DD/MM/YYYY"
                                    />
                                </Form.Item>
                            </FormControl>
                        </FormRow>

                        <FormRow>
                            <FormLabel></FormLabel>
                            <FormControl>
                                <SaveButton type="primary" htmlType="submit">
                                    Lưu thay đổi
                                </SaveButton>
                            </FormControl>
                        </FormRow>
                    </FormWrapper>
                </WrapperMainContent>
            </WrapperContent>
        </WrapperContainer>
    );
};

export default AccountInfoPage;