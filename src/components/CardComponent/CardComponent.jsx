import React from 'react'
import { Card } from 'antd'
import { StarFilled } from '@ant-design/icons'
import {
  WrapperCardStyle,
  WrapperImageStyle,
  WrapperPriceText,
  WrapperDiscountText,
  WrapperReportText,
  WrapperStyleNameCard
} from './style'

const CardComponent = ({ 
  image = "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png", 
  name = "Tên sản phẩm", 
  price = 0, 
  rating = 0, 
  sold = 0, 
  discount = 0 
}) => {
  return (
    <WrapperCardStyle
      hoverable
      cover={
        <WrapperImageStyle 
          draggable={false}
          alt={name}
          src={image}
        />
      }
    >
      <WrapperStyleNameCard>{name}</WrapperStyleNameCard>
      
      <WrapperReportText>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <StarFilled style={{ fontSize: '12px', color: '#ffce3d' }} />
          <span style={{ marginLeft: '4px' }}>{rating}</span>
        </span>
        <span style={{ marginLeft: '10px' }}>
          | Đã bán {sold >= 1000 ? `${(sold / 1000).toFixed(1)}k` : sold}+
        </span>
      </WrapperReportText>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
        <WrapperPriceText>
          {price.toLocaleString('vi-VN')}đ
        </WrapperPriceText>
        {discount > 0 && (
          <WrapperDiscountText>
            -{discount}%
          </WrapperDiscountText>
        )}
      </div>
    </WrapperCardStyle>
  )
}

export default CardComponent