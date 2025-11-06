import { Image, InputNumber } from 'antd'
import styled from 'styled-components'

export const WrapperStyleImageSmall = styled(Image)`
  height: 64px;
  width: 64px;
  cursor: pointer;
  border: ${props => props.selected ? '2px solid #326e51' : '1px solid #e5e5e5'};
  border-radius: 4px;
  object-fit: cover;
`

export const WrapperStyleColImage = styled.div`
  flex-basis: unset;
  display: flex;
`

export const WrapperStyleNameProduct = styled.h1`
  color: #333;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  word-break: break-word;
  margin-bottom: 10px;
`

export const WrapperStyleTextSell = styled.span`
  font-size: 14px;
  line-height: 24px;
  color: #787878;
`

export const WrapperPriceProduct = styled.div`
  background: #fafafa;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  display: flex;
  align-items: center;
`

export const WrapperPriceTextProduct = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #ff424e;
  margin: 0;
`

export const WrapperAddressProduct = styled.div`
  span.address {
    text-decoration: underline;
    font-size: 15px;
    line-height: 24px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span.change-address {
    color: #326e51;
    font-size: 14px;
    line-height: 24px;
    font-weight: 500;
    cursor: pointer;
    margin-left: 4px;

    &:hover {
      text-decoration: underline;
    }
  }
`

export const WrapperQualityProduct = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  border-radius: 4px;
  width: fit-content;
`

export const WrapperBtnQualityProduct = styled.button`
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f5f5f5;
  }
`

export const WrapperInputNumber = styled(InputNumber)`
  width: 60px;
  
  .ant-input-number-handler-wrap {
    display: none;
  }

  .ant-input-number-input {
    text-align: center;
  }
`

export const WrapperProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 20px 0;
  font-size: 14px;
  color: #333;

  strong {
    font-weight: 600;
    min-width: 100px;
    display: inline-block;
  }
`

export const WrapperDescription = styled.div`
  border-top: 1px solid #e5e5e5;
  padding: 24px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 16px 0 8px 0;
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    margin: 12px 0 8px 0;
  }

  p {
    font-size: 14px;
    line-height: 24px;
    color: #333;
    margin-bottom: 12px;
  }

  ul {
    padding-left: 24px;
    margin-bottom: 12px;

    li {
      font-size: 14px;
      line-height: 24px;
      color: #333;
      margin-bottom: 4px;
    }
  }
`