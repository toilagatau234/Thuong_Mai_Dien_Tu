import React from 'react'
import { Col } from 'antd'
import {
    WrapperHeader,
    WrapperHeaderAccount,
    WrapperTextHeader,
    WrapperTextHeaderSmall,
    ButtonSearch
} from './style'
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const HeaderComponent = () => {
    const navigate = useNavigate()

    const handleSearch = (value) => {
        console.log('Tìm kiếm:', value)
        // Xử lý logic tìm kiếm ở đây
    }

    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }

    const handleNavigateHome = () => {
        navigate('/')
    }

    const handleNavigateOrder = () => {
        navigate('/order')
    }

    return (
        <div>
            <WrapperHeader>
                <Col span={6}>
                    <WrapperTextHeader onClick={handleNavigateHome}>
                        BEAUTYCOSMETIC
                    </WrapperTextHeader>
                </Col>
                <Col span={12}>
                    <ButtonSearch
                        placeholder="Nhập thứ bạn cần tìm"
                        allowClear
                        enterButton="Tìm kiếm"
                        size="large"
                        onSearch={handleSearch}
                    />
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <WrapperHeaderAccount onClick={handleNavigateLogin}>
                        <UserOutlined style={{ fontSize: '30px', color: '#333' }} />
                        <div>
                            <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                            <div>
                                <WrapperTextHeaderSmall>Tài khoản </WrapperTextHeaderSmall>
                                <CaretDownOutlined />
                            </div>
                        </div>
                    </WrapperHeaderAccount>
                    <div
                        style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
                        onClick={handleNavigateOrder}
                    >
                        <ShoppingCartOutlined style={{ fontSize: '30px', color: '#333' }} />
                        <WrapperTextHeaderSmall>
                            Giỏ Hàng
                        </WrapperTextHeaderSmall>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent