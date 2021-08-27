import React, { useState } from 'react'
import styled from 'styled-components'
import { Grid } from '../elements/Grid'
import { Image } from '../elements/Image'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as uAc } from '../redux/modules/restaurant'
import { OwnerPermit } from '../shared/OwnerPermit'
import { Input } from '../elements'
import { Upload } from '../elements/Upload'

export const Menu = ({ menu }) => {
  const preview = useSelector(state => state.image.preview)

  const dispatch = useDispatch()

  const increaseQuantity = () => {
    dispatch(uAc.incrementMenuQuantity(menu.id))
    dispatch(uAc.calculateTotalPrice(menu.id))
  }

  const decreaseQuantity = () => {
    dispatch(uAc.decrementMenuQuantity(menu.id))
    dispatch(uAc.calculateTotalPrice(menu.id))
  }

  const [name, setName] = useState('')
  const [img, setImg] = useState('')
  const [price, setPrice] = useState(0)

  const handleChangeMenu = (target, value) => {
    switch (target) {
      case 'name':
        setName(value)
        break
      case 'img':
        setImg(value)
        break
      case 'price':
        setPrice(value)
        break
      default:
        break
    }
    dispatch(uAc.updateMenu({ id: menu.id, target: target, value: value }))
  }

  return (
    <OwnerPermit>
      <Grid padding='16px' key={menu.index}>
        <Grid>
          <Image shape='rectangle' src={preview ? preview : menu.src} />
        </Grid>
        <Grid>
          <Input
            label='메뉴명'
            value={name ? name : menu.name}
            _onChange={e => handleChangeMenu('name', e.target.value)}
          />
          <Input
            label='가격'
            value={price ? price : menu.price}
            _onChange={e => handleChangeMenu('price', e.target.value)}
            type='number'
          />
        </Grid>
        <Upload text='이미지 수정' />
      </Grid>
      <Grid padding='16px' key={menu.index}>
        <Grid is_flex>
          <Image shape='rectangle' src={menu.src}></Image>
        </Grid>
        <Grid>
          <Service>
            <MenuPanel onClick={increaseQuantity} isActive={menu.active}>
              {menu.name}
              <b>₩ {new Intl.NumberFormat().format(menu.price)}원</b>
            </MenuPanel>
            <QuantityInput>
              <UpQuantityButton type='number' onClick={increaseQuantity}>
                &#xff0b;
              </UpQuantityButton>
              <QuantityScreen>{menu.quantity}</QuantityScreen>
              <DownQuantityButton type='number' onClick={decreaseQuantity}>
                &mdash;
              </DownQuantityButton>
            </QuantityInput>
          </Service>
        </Grid>
      </Grid>
    </OwnerPermit>
  )
}

const Service = styled.div`
  list-style: none;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MenuPanel = styled.p`
  width: 90%;
  padding: 28px 20px;
  margin-bottom: 3px;
  position: relative;
  cursor: pointer;
  transition: 0.3s;
  ${props =>
    props.isActive
      ? 'background-color: #41c7c2; color:#fff;'
      : 'background-color: #F8F8F8; color: #7B8585;'};
  &:hover {
    ${props =>
      props.isActive
        ? 'background-color: #41d7c8; color:#fffc;'
        : 'background-color: #d8f2f1; color: #7B8585;'};
  }
  > b {
    position: absolute;
    right: 50px;
    line-height: 16px;
    width: 100px;
    color: #808787;
    text-align: right;
    ${props => (props.isActive ? 'color: #fff' : 'color: #808787')};
  }
`

const QuantityInput = styled.div`
  border-radius: 3px;
  width: 10%;
  height: 100%;
  &:focus {
    background: red;
  }
  > button {
    background: #f3f3f3;
    color: #888;
    border: 0 solid #dbdbdb;
    text-align: center;
    text-shadow: 0 1px 0 rgba(#fff, 0.6);
    cursor: pointer;
    &:hover {
      ${props =>
        props.isActive
          ? 'background-color: #41d7c8; color:#fffc;'
          : 'background-color: #d8f2f1; color: #7B8585;'};
    }
  }
`

const UpQuantityButton = styled.button`
  width: 100%;
  height: 30%;
  border-radius: 0 0 2px 0;
`

const DownQuantityButton = styled.button`
  width: 100%;
  height: 30%;
  border-radius: 2px 0 0 2px;
`

const QuantityScreen = styled.div`
  width: 100%;
  height: 30%;
  text-align: center;
`
