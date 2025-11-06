import React, { useState } from 'react'
import { Row, Col, Pagination } from 'antd'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import { WrapperTypeProduct, WrapperProducts } from './style'

// Import ảnh
import slider1 from '../../assets/images/slider1.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.jpg'
import slider4 from '../../assets/images/slider4.jpg'
import slider5 from '../../assets/images/slider5.jpg'
import slider6 from '../../assets/images/slider6.jpg'
import slider7 from '../../assets/images/slider7.jpg'
import slider8 from '../../assets/images/slider8.jpg'

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const productTypes = [
    'Chăm sóc da mặt',
    'Trang điểm',
    'Chăm sóc tóc',
    'Nước hoa',
    'Chăm sóc cơ thể',
    'Dưỡng da chuyên sâu',
    'Dụng cụ & Phụ kiện',
    'Thực phẩm làm đẹp',
    'Thương hiệu nổi bật',
    'Khuyến mãi & Combo'
  ]

  const sliderImages = [
    slider1, 
    slider2, 
    slider3, 
    slider4, 
    slider5, 
    slider6, 
    slider7, 
    slider8
  ]

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    console.log('Trang hiện tại:', page)
  }

  return (
    <div style={{ width: '100%', backgroundColor: '#efefef' }}>
      <div style={{ width: '1270px', margin: '0 auto' }}>
        {/* Menu loại sản phẩm */}
        <WrapperTypeProduct>
          {productTypes.map((item) => (
            <TypeProduct name={item} key={item} />
          ))}
        </WrapperTypeProduct>
      </div>

      {/* Slider banner - full width */}
      <div style={{ width: '100%', backgroundColor: '#fff' }}>
        <div style={{ width: '1270px', margin: '0 auto', padding: '0 0 20px 0' }}>
          <SliderComponent arrImage={sliderImages} />
        </div>
      </div>

      {/* Phần sản phẩm với NavBar và Card */}
      <div style={{ width: '1270px', margin: '0 auto' }}>
        <WrapperProducts>
          <Row gutter={20}>
            {/* Sidebar NavBar */}
            <Col span={5}>
              <NavBarComponent />
            </Col>

            {/* Danh sách sản phẩm */}
            <Col span={19}>
              <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                  Sản phẩm nổi bật
                </h2>
                <Row gutter={[16, 16]}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <Col xs={24} sm={12} md={12} lg={8} xl={6} key={item}>
                      <CardComponent
                        name="Serum Vitamin C Some By Mi Galactomyces Pure Vitamin C Glow Serum"
                        price={320000}
                        rating={4.8}
                        sold={2500}
                        discount={20}
                      />
                    </Col>
                  ))}
                </Row>
                
                {/* Pagination */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  marginTop: '30px',
                  paddingBottom: '20px'
                }}>
                  <Pagination
                    current={currentPage}
                    total={100}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    showTotal={(total) => `Tổng ${total} sản phẩm`}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </WrapperProducts>
      </div>
    </div>
  )
}

export default HomePage