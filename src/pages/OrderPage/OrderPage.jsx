import React, { useState } from 'react'
import { Row, Col, Image, Button, Checkbox } from 'antd'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import {
  WrapperLeft,
  WrapperRight,
  WrapperInfo,
  WrapperTotal,
  WrapperItemOrder,
  WrapperCountOrder,
  WrapperInputNumber
} from './style'
import { useNavigate } from 'react-router-dom'

const OrderPage = () => {
  const navigate = useNavigate()
  const [listChecked, setListChecked] = useState([])

  // 🔹 Dữ liệu giỏ hàng mẫu
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Serum Vitamin C Some By Mi Galactomyces Pure Vitamin C Glow Serum 30ml',
      image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      price: 320000,
      amount: 1,
      discount: 20
    },
    {
      id: 2,
      name: 'Kem Dưỡng Ẩm Neutrogena Hydro Boost Water Gel 50g',
      image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      price: 450000,
      amount: 2,
      discount: 15
    },
    {
      id: 3,
      name: 'Mặt Nạ Innisfree My Real Squeeze Mask 20ml',
      image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      price: 25000,
      amount: 5,
      discount: 0
    }
  ])

  // 🔹 Chọn tất cả
  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const allProductIds = cartItems.map(item => item.id)
      setListChecked(allProductIds)
    } else {
      setListChecked([])
    }
  }

  // 🔹 Thay đổi số lượng sản phẩm
  const handleChangeCount = (type, idProduct) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === idProduct) {
          if (type === 'increase') return { ...item, amount: item.amount + 1 }
          if (type === 'decrease' && item.amount > 1) return { ...item, amount: item.amount - 1 }
        }
        return item
      })
    )
  }

  // 🔹 Xóa sản phẩm
  const handleDeleteOrder = (idProduct) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== idProduct))
    setListChecked(prevChecked => prevChecked.filter(id => id !== idProduct))
  }

  // 🔹 Chọn từng sản phẩm
  const handleOnchangeCheckbox = (id) => {
    setListChecked(prevChecked => {
      if (prevChecked.includes(id)) {
        return prevChecked.filter(item => item !== id)
      } else {
        return [...prevChecked, id]
      }
    })
  }

  // 🔹 Tính toán giá sau giảm
  const calculatePrice = (price, discount) => {
    return price - (price * discount / 100)
  }

  // 🔹 Tổng tiền sản phẩm được chọn
  const priceMemo = listChecked.reduce((total, id) => {
    const item = cartItems.find(item => item.id === id)
    if (item) return total + (calculatePrice(item.price, item.discount) * item.amount)
    return total
  }, 0)

  // 🔹 Tổng giảm giá
  const priceDiscountMemo = listChecked.reduce((total, id) => {
    const item = cartItems.find(item => item.id === id)
    if (item && item.discount > 0) {
      return total + ((item.price * item.discount / 100) * item.amount)
    }
    return total
  }, 0)

  // 🔹 Phí giao hàng
  const deliveryPriceMemo = priceMemo >= 500000 ? 0 : 30000

  // 🔹 Tổng cộng
  const totalPriceMemo = priceMemo + deliveryPriceMemo

  // 🔹 Xử lý khi nhấn "Mua hàng"
  const handleCheckout = () => {
    if (listChecked.length === 0) {
      alert('Vui lòng chọn sản phẩm để thanh toán')
      return
    }
    console.log('Thanh toán:', listChecked)
    navigate('/payment') // ✅ Chuyển hướng sang trang PaymentPage
  }

  return (
    <div style={{ background: '#f5f5fa', width: '100%', minHeight: '100vh', paddingBottom: '40px' }}>
      <div style={{ width: '1270px', margin: '0 auto', paddingTop: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Giỏ hàng</h2>

        <Row gutter={16}>
          <Col span={18}>
            <WrapperLeft>
              {/* --- Checkbox chọn tất cả --- */}
              <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#fff', borderRadius: '8px' }}>
                <Checkbox
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked.length === cartItems.length && cartItems.length > 0}
                >
                  <span style={{ fontWeight: '500' }}>
                    Chọn tất cả ({cartItems.length} sản phẩm)
                  </span>
                </Checkbox>
              </div>

              {/* --- Nếu giỏ trống --- */}
              {cartItems.length === 0 ? (
                <div style={{
                  background: '#fff',
                  padding: '40px',
                  textAlign: 'center',
                  borderRadius: '8px'
                }}>
                  <p style={{ fontSize: '16px', color: '#999' }}>Giỏ hàng của bạn đang trống</p>
                  <Button
                    type="primary"
                    onClick={() => navigate('/')}
                    style={{
                      backgroundColor: '#326e51',
                      borderColor: '#326e51',
                      marginTop: '20px',
                      height: '40px'
                    }}
                  >
                    Tiếp tục mua sắm
                  </Button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <WrapperItemOrder key={item.id}>
                    {/* --- Cột thông tin sản phẩm --- */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <Checkbox
                        onChange={() => handleOnchangeCheckbox(item.id)}
                        checked={listChecked.includes(item.id)}
                      />
                      <Image
                        src={item.image}
                        alt="product"
                        preview={false}
                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: '8px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}>
                          {item.name}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#ff424e'
                          }}>
                            {calculatePrice(item.price, item.discount).toLocaleString('vi-VN')}đ
                          </span>
                          {item.discount > 0 && (
                            <>
                              <span style={{
                                fontSize: '14px',
                                color: '#999',
                                textDecoration: 'line-through'
                              }}>
                                {item.price.toLocaleString('vi-VN')}đ
                              </span>
                              <span style={{
                                fontSize: '12px',
                                color: '#ff424e',
                                backgroundColor: '#fff0f1',
                                padding: '2px 6px',
                                borderRadius: '4px'
                              }}>
                                -{item.discount}%
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* --- Bộ đếm số lượng --- */}
                    <WrapperCountOrder>
                      <button
                        style={{
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          background: '#fff',
                          cursor: 'pointer',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onClick={() => handleChangeCount('decrease', item.id)}
                      >
                        <MinusOutlined style={{ fontSize: '12px' }} />
                      </button>

                      <WrapperInputNumber
                        value={item.amount}
                        size="small"
                        min={1}
                        max={100}
                      />

                      <button
                        style={{
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          background: '#fff',
                          cursor: 'pointer',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onClick={() => handleChangeCount('increase', item.id)}
                      >
                        <PlusOutlined style={{ fontSize: '12px' }} />
                      </button>
                    </WrapperCountOrder>

                    {/* --- Tổng tiền từng sản phẩm --- */}
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#ff424e',
                      minWidth: '100px',
                      textAlign: 'right'
                    }}>
                      {(calculatePrice(item.price, item.discount) * item.amount).toLocaleString('vi-VN')}đ
                    </div>

                    <DeleteOutlined
                      style={{
                        fontSize: '20px',
                        color: '#999',
                        cursor: 'pointer',
                        marginLeft: '20px'
                      }}
                      onClick={() => handleDeleteOrder(item.id)}
                    />
                  </WrapperItemOrder>
                ))
              )}
            </WrapperLeft>
          </Col>

          {/* --- Phần tổng kết bên phải --- */}
          <Col span={6}>
            <WrapperRight>
              <div style={{ marginBottom: '16px' }}>
                <WrapperInfo>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: 'bold' }}>Hồ Chí Minh</span>
                  <span
                    style={{ color: '#326e51', cursor: 'pointer', marginLeft: '8px' }}
                    onClick={() => console.log('Đổi địa chỉ')}
                  >
                    Thay đổi
                  </span>
                </WrapperInfo>
              </div>

              <div style={{
                borderTop: '1px solid #e5e5e5',
                paddingTop: '16px',
                marginBottom: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  fontSize: '14px'
                }}>
                  <span>Tạm tính</span>
                  <span>{priceMemo.toLocaleString('vi-VN')}đ</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  fontSize: '14px',
                  color: '#ff424e'
                }}>
                  <span>Giảm giá</span>
                  <span>-{priceDiscountMemo.toLocaleString('vi-VN')}đ</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  fontSize: '14px'
                }}>
                  <span>Phí giao hàng</span>
                  <span>{deliveryPriceMemo === 0 ? 'Miễn phí' : `${deliveryPriceMemo.toLocaleString('vi-VN')}đ`}</span>
                </div>

                {priceMemo < 500000 && priceMemo > 0 && (
                  <div style={{
                    fontSize: '12px',
                    color: '#666',
                    background: '#f5f5f5',
                    padding: '8px',
                    borderRadius: '4px',
                    marginBottom: '12px'
                  }}>
                    Mua thêm {(500000 - priceMemo).toLocaleString('vi-VN')}đ để được miễn phí vận chuyển
                  </div>
                )}
              </div>

              <WrapperTotal>
                <span style={{ fontSize: '16px', fontWeight: '500' }}>Tổng cộng</span>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff424e' }}>
                  {totalPriceMemo.toLocaleString('vi-VN')}đ
                </span>
              </WrapperTotal>

              <Button
                type="primary"
                size="large"
                onClick={handleCheckout}
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: '#326e51',
                  borderColor: '#326e51',
                  fontSize: '16px',
                  fontWeight: '600',
                  marginTop: '16px'
                }}
              >
                Mua hàng ({listChecked.length})
              </Button>
            </WrapperRight>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default OrderPage
