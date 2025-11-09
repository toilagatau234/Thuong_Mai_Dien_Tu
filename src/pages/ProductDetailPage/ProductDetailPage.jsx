import React, { useState } from 'react'
import { Row, Col, Image, Rate, InputNumber, Button } from 'antd'
import { PlusOutlined, MinusOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import {
  WrapperStyleImageSmall,
  WrapperStyleColImage,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperAddressProduct,
  WrapperQualityProduct,
  WrapperInputNumber,
  WrapperBtnQualityProduct,
  WrapperProductInfo,
  WrapperDescription
} from './style'

const ProductDetailPage = () => {
  const [numProduct, setNumProduct] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Data mẫu - sau này sẽ fetch từ API
  const product = {
    name: 'Serum Vitamin C Some By Mi Galactomyces Pure Vitamin C Glow Serum 30ml',
    price: 320000,
    originalPrice: 400000,
    rating: 4.8,
    sold: 2500,
    discount: 20,
    countInStock: 100,
    images: [
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
    ],
    description: `
      <h3>Mô tả sản phẩm</h3>
      <p>Serum Vitamin C Some By Mi Galactomyces Pure Vitamin C Glow Serum là sản phẩm serum dưỡng sáng da, mờ thâm nám hiệu quả.</p>
      
      <h4>Thành phần chính:</h4>
      <ul>
        <li>Pure Vitamin C 75%</li>
        <li>Galactomyces Ferment Filtrate</li>
        <li>Niacinamide</li>
        <li>Adenosine</li>
      </ul>

      <h4>Công dụng:</h4>
      <ul>
        <li>Dưỡng sáng da, mờ thâm nám</li>
        <li>Cải thiện màu da không đều</li>
        <li>Giảm nếp nhăn, chống lão hóa</li>
        <li>Cấp ẩm, làm mịn da</li>
      </ul>

      <h4>Hướng dẫn sử dụng:</h4>
      <p>Sau bước toner, lấy 2-3 giọt serum thoa đều lên mặt. Vỗ nhẹ để serum thấm sâu vào da. Sử dụng 2 lần/ngày sáng và tối.</p>

      <h4>Lưu ý:</h4>
      <p>Nên sử dụng kem chống nắng khi dùng sản phẩm chứa Vitamin C vào ban ngày.</p>
    `,
    brand: 'Some By Mi',
    origin: 'Hàn Quốc',
    volume: '30ml'
  }

  const handleChangeCount = (type) => {
    if (type === 'increase') {
      setNumProduct(numProduct + 1)
    } else if (type === 'decrease' && numProduct > 1) {
      setNumProduct(numProduct - 1)
    }
  }

  const handleAddToCart = () => {
    console.log('Thêm vào giỏ hàng:', numProduct, 'sản phẩm')
  }

  const handleBuyNow = () => {
    console.log('Mua ngay:', numProduct, 'sản phẩm')
  }

  return (
    <div style={{ width: '100%', backgroundColor: '#efefef', padding: '20px 0' }}>
      <div style={{ width: '1270px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '8px' }}>
        <Row style={{ padding: '16px' }}>
          {/* Phần hình ảnh */}
          <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '20px' }}>
            <Image 
              src={product.images[selectedImage]} 
              alt="product" 
              preview={false}
              style={{ width: '100%', height: '450px', objectFit: 'cover' }}
            />
            <Row style={{ paddingTop: '10px', display: 'flex', gap: '10px', flexWrap: 'nowrap' }}>
              {product.images.map((image, index) => (
                <WrapperStyleColImage span={4} key={index}>
                  <WrapperStyleImageSmall 
                    src={image} 
                    alt="small-image" 
                    preview={false}
                    onClick={() => setSelectedImage(index)}
                    selected={selectedImage === index}
                  />
                </WrapperStyleColImage>
              ))}
            </Row>
          </Col>

          {/* Phần thông tin sản phẩm */}
          <Col span={14} style={{ paddingLeft: '20px' }}>
            <WrapperStyleNameProduct>{product.name}</WrapperStyleNameProduct>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Rate allowHalf disabled defaultValue={product.rating} style={{ fontSize: '14px' }} />
              <WrapperStyleTextSell> | Đã bán {product.sold}+</WrapperStyleTextSell>
            </div>

            <WrapperPriceProduct>
              <WrapperPriceTextProduct>
                {product.price.toLocaleString('vi-VN')}đ
              </WrapperPriceTextProduct>
              <span style={{ 
                fontSize: '14px', 
                color: '#999', 
                textDecoration: 'line-through',
                marginLeft: '10px'
              }}>
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </span>
              <span style={{
                fontSize: '14px',
                color: '#ff424e',
                backgroundColor: '#fff0f1',
                padding: '2px 8px',
                borderRadius: '4px',
                marginLeft: '10px'
              }}>
                -{product.discount}%
              </span>
            </WrapperPriceProduct>

            <WrapperProductInfo>
              <div><strong>Thương hiệu:</strong> {product.brand}</div>
              <div><strong>Xuất xứ:</strong> {product.origin}</div>
              <div><strong>Dung tích:</strong> {product.volume}</div>
            </WrapperProductInfo>

            <WrapperAddressProduct>
              <span>Giao đến: </span>
              <span className='address'>Hồ Chí Minh</span> - 
              <span className='change-address'> Đổi địa chỉ</span>
            </WrapperAddressProduct>

            <div style={{ margin: '20px 0', borderTop: '1px solid #e5e5e5', paddingTop: '20px' }}>
              <div style={{ marginBottom: '10px', fontSize: '16px', fontWeight: '500' }}>
                Số lượng
              </div>
              <WrapperQualityProduct>
                <WrapperBtnQualityProduct onClick={() => handleChangeCount('decrease')}>
                  <MinusOutlined style={{ color: '#000', fontSize: '16px' }} />
                </WrapperBtnQualityProduct>
                
                <WrapperInputNumber 
                  value={numProduct} 
                  size="small"
                  min={1}
                  max={product.countInStock}
                  onChange={(value) => setNumProduct(value)}
                />
                
                <WrapperBtnQualityProduct onClick={() => handleChangeCount('increase')}>
                  <PlusOutlined style={{ color: '#000', fontSize: '16px' }} />
                </WrapperBtnQualityProduct>
              </WrapperQualityProduct>
              <div style={{ fontSize: '14px', color: '#787878', marginTop: '8px' }}>
                {product.countInStock} sản phẩm có sẵn
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <Button 
                size="large"
                icon={<ShoppingCartOutlined />}
                style={{
                  flex: 1,
                  height: '48px',
                  border: '1px solid #326e51',
                  color: '#326e51',
                  fontWeight: '500',
                  fontSize: '16px'
                }}
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>
              
              <Button 
                type="primary"
                size="large"
                style={{
                  flex: 1,
                  height: '48px',
                  backgroundColor: '#326e51',
                  borderColor: '#326e51',
                  fontWeight: '500',
                  fontSize: '16px'
                }}
                onClick={handleBuyNow}
              >
                Mua ngay
              </Button>
            </div>
          </Col>
        </Row>

        {/* Mô tả sản phẩm */}
        <WrapperDescription>
          <h2>Chi tiết sản phẩm</h2>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </WrapperDescription>
      </div>
    </div>
  )
}

export default ProductDetailPage