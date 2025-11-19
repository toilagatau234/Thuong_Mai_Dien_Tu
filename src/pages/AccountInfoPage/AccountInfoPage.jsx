import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, DatePicker, message } from 'antd';
import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
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

import axiosClient from '../../apis/axiosClient';

const AccountInfoPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [phoneIsSet, setPhoneIsSet] = useState(false);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserEmail(user.email || '');
        setUserPhone(user.phone || '');
        setPhoneIsSet(!!user.phone); // Nếu có số điện thoại thì khóa

        const fullName = user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim();
        const birthday = user.birthday ? dayjs(user.birthday) : null;

        form.setFieldsValue({
          name: fullName,
          phone: user.phone || '',
          gender: user.gender || 'other',
          birthday: birthday
        });
      } catch {
        navigate('/sign-in');
      }
    } else {
      navigate('/sign-in');
    }

    // Lắng nghe event userUpdated từ ProfileSidebar để cập nhật form
    const handleUserUpdated = (event) => {
      const updatedUser = event.detail;
      setUserEmail(updatedUser.email || '');
      setUserPhone(updatedUser.phone || '');
      setPhoneIsSet(!!updatedUser.phone);

      const fullName = updatedUser.name || `${updatedUser.firstName || ''} ${updatedUser.lastName || ''}`.trim();
      const birthday = updatedUser.birthday ? dayjs(updatedUser.birthday) : null;

      form.setFieldsValue({
        name: fullName,
        phone: updatedUser.phone || '',
        gender: updatedUser.gender || 'other',
        birthday: birthday
      });
    };

    window.addEventListener('userUpdated', handleUserUpdated);
    return () => window.removeEventListener('userUpdated', handleUserUpdated);
  }, [navigate, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Chuẩn bị dữ liệu gửi đi
      const dataToSend = {
        firstName: values.name,
        phone: values.phone,
        gender: values.gender,
        birthday: values.birthday ? values.birthday.toISOString() : null
      };

      // axiosClient sẽ tự động thêm token qua interceptor
      const response = await axiosClient.put('/api/users/profile', dataToSend);

      if (response.data?.success || response.status === 200) {
        const oldUserString = localStorage.getItem('user');
        if (oldUserString) {
          const oldUser = JSON.parse(oldUserString);

          const newUser = response.data.data || {
            ...oldUser,
            name: values.name,
            firstName: values.name,
            lastName: '', // Xóa lastName để tránh ghép lại
            phone: values.phone,
            gender: values.gender,
            birthday: values.birthday ? values.birthday.toISOString() : null
          };

          localStorage.setItem('user', JSON.stringify(newUser));
          setPhoneIsSet(!!values.phone); // Khóa số điện thoại sau khi lưu

          // Dispatch custom event để cập nhật toàn bộ component
          console.log('Dispatching userUpdated event:', newUser);
          window.dispatchEvent(new CustomEvent('userUpdated', { detail: newUser }));
        }

        // Hiển thị thông báo thành công
        message.success({
          content: '✅ Cập nhật thông tin thành công!',
          duration: 3
        });

        // Điều hướng sau 1.5 giây để user nhìn thấy thông báo
        setTimeout(() => {
          navigate('/profile');
        }, 1500);
      } else {
        message.error(response.data?.message || 'Cập nhật thất bại');
      }
    } catch (error) {
      console.error('❌ Lỗi:', error);
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật');
    } finally {
      setLoading(false);
    }
  };  return (
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
                  name="name"
                  rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                >
                  <Input
                    placeholder="Nhập họ và tên"
                    size="large"
                    prefix={<UserOutlined />}
                  />
                </Form.Item>
              </FormControl>
            </FormRow>

            <FormRow>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  size="large"
                  value={userEmail}
                  disabled
                  style={{ backgroundColor: '#f5f5f5', color: '#888' }}
                />
              </FormControl>
            </FormRow>

            <FormRow>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại' },
                    { pattern: /^(84|0[3|5|7|8|9])+([0-9]{8})$/, message: 'Số điện thoại không hợp lệ (VD: 098...)' }
                  ]}
                >
                  <Input
                    placeholder="Nhập số điện thoại"
                    size="large"
                    prefix={<PhoneOutlined />}
                    disabled={phoneIsSet}
                    style={phoneIsSet ? { backgroundColor: '#f5f5f5', color: '#888' } : {}}
                  />
                </Form.Item>
              </FormControl>
            </FormRow>

            <FormRow>
              <FormLabel>Giới tính</FormLabel>
              <FormControl>
                <Form.Item
                  name="gender"
                  rules={[{ required: false }]}
                >
                  <Select
                    size="large"
                    placeholder="Chọn giới tính"
                    options={[
                      { label: 'Nam', value: 'male' },
                      { label: 'Nữ', value: 'female' },
                      { label: 'Khác', value: 'other' }
                    ]}
                  />
                </Form.Item>
              </FormControl>
            </FormRow>

            <FormRow>
              <FormLabel>Ngày sinh</FormLabel>
              <FormControl>
                <Form.Item
                  name="birthday"
                  rules={[{ required: false }]}
                >
                  <DatePicker
                    size="large"
                    placeholder="Chọn ngày sinh"
                    style={{ width: '100%' }}
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </FormControl>
            </FormRow>

            <FormRow>
              <FormLabel></FormLabel>
              <FormControl>
                <SaveButton type="primary" htmlType="submit" loading={loading}>
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
