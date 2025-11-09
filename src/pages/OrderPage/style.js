import { InputNumber } from 'antd'
import styled from 'styled-components'

export const WrapperLeft = styled.div`
  width: 100%;
`

export const WrapperRight = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  position: sticky;
  top: 20px;
`

export const WrapperInfo = styled.div`
  padding: 16px;
  border-radius: 8px;
  background: #f5f5f5;
  font-size: 14px;
`

export const WrapperTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 2px solid #326e51;
`

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background: #fff;
  margin-bottom: 12px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
`

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 20px;
`

export const WrapperInputNumber = styled(InputNumber)`
  width: 50px;
  
  .ant-input-number-handler-wrap {
    display: none;
  }

  .ant-input-number-input {
    text-align: center;
  }
`