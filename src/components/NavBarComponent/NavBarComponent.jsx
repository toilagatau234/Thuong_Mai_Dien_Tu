import React from 'react'
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from './style'
import { Checkbox, Rate } from 'antd'

const NavBarComponent = () => {
  const onChange = () => {}
  
  const renderContent = (type, options) => {
    switch (type) {
      case 'text':
        return options.map((option) => (
          <WrapperTextValue key={option}>{option}</WrapperTextValue>
        ))
      case 'checkbox':
        return (
          <Checkbox.Group 
            style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} 
            onChange={onChange}
          >
            {options.map((option) => (
              <Checkbox key={option.value} value={option.value}>
                {option.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        )
      case 'star':
        return options.map((option) => (
          <div key={option} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <Rate disabled defaultValue={option} style={{ fontSize: '14px' }} />
            <span style={{ fontSize: '12px', color: '#787878' }}>từ {option} sao</span>
          </div>
        ))
      case 'price':
        return options.map((option) => (
          <WrapperTextPrice key={option}>{option}</WrapperTextPrice>
        ))
      default:
        return {}
    }
  }

  return (
    <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
      <WrapperLableText>Danh mục</WrapperLableText>
      <WrapperContent>
        {renderContent('text', [
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
        ])}
      </WrapperContent>

      <WrapperLableText>Thương hiệu</WrapperLableText>
      <WrapperContent>
        {renderContent('checkbox', [
          { value: 'innisfree', label: 'Innisfree' },
          { value: 'laneige', label: 'Laneige' },
          { value: 'somebymi', label: 'Some By Mi' },
          { value: 'cocoon', label: 'Cocoon' },
          { value: 'loreal', label: "L'Oreal" },
          { value: 'maybelline', label: 'Maybelline' },
          { value: 'bioderma', label: 'Bioderma' },
          { value: 'laroche', label: 'La Roche-Posay' }
        ])}
      </WrapperContent>

      <WrapperLableText>Đánh giá</WrapperLableText>
      <WrapperContent>
        {renderContent('star', [5, 4, 3])}
      </WrapperContent>

      <WrapperLableText>Khoảng giá</WrapperLableText>
      <WrapperContent>
        {renderContent('price', [
          'Dưới 100.000đ',
          '100.000đ - 300.000đ',
          '300.000đ - 500.000đ',
          '500.000đ - 1.000.000đ',
          'Trên 1.000.000đ'
        ])}
      </WrapperContent>
    </div>
  )
}

export default NavBarComponent