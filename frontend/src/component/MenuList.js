import React, { useState } from 'react'
import styled from 'styled-components'
import { Menu } from './Menu'
import { useSelector } from 'react-redux'
import { Button, Grid } from '../elements'
import Modal from '../elements/Modal'
import { MenuInsert } from './MenuInsert'
import { OwnerPermit } from '../shared/OwnerPermit'

export const MenuList = () => {
  const restaurant = useSelector(state => state.restaurant)
  const user = useSelector(state => state.user)
  const [menumodalVisible, setmenuModalVisible] = useState(false)

  const openMenuModal = () => {
    setmenuModalVisible(true)
  }
  const closeModal = () => {
    setmenuModalVisible(false)
  }

  const [menuListvisible, setMenuListvisible] = useState(false)
  const [menuOrdervisible, setMenuOrderVisible] = useState(false)

  const order = () => {
    if (restaurant.info.seats.find(seat => seat.client === user.user) && user.is_login) {
    }

    // 임시
    const userId = 'Henrietta'
    //const userId = ''
    if (restaurant.info.seats.find(seat => seat.client === userId)) {
      setMenuOrderVisible(!menuOrdervisible)
    }
  }

  const openMenuList = () => {
    setMenuListvisible(!menuListvisible)
  }

  return (
    <OwnerPermit>
      <MenuOrder>
        <Button _onClick={openMenuList}>{menuListvisible ? '메뉴 닫기' : '메뉴 열기'}</Button>
        <Brochure visibility={menuListvisible}>
          <Grid>
            {restaurant.menu_list &&
              restaurant.menu_list.map((menu, index) => <Menu menu={menu} key={index} />)}
            <Button is_float text='+' _onClick={openMenuModal} onClose={closeModal} />
            {menumodalVisible && (
              <Modal
                visible={menumodalVisible}
                closable={true}
                maskClosable={true}
                onClose={closeModal}
              >
                <MenuInsert onClose={closeModal} />
              </Modal>
            )}
          </Grid>
        </Brochure>
      </MenuOrder>
      <MenuOrder>
        <Button _onClick={order}>주문하기</Button>
        <br />
        <Brochure visibility={menuOrdervisible}>
          <Grid>
            <br />
            <TotalPrice>
              총 ₩ {new Intl.NumberFormat().format(restaurant.total_price)}원 결제하기
            </TotalPrice>
            {restaurant.menu_list &&
              restaurant.menu_list.map((menu, index) => <Menu menu={menu} key={index} />)}
            <Button is_float text='+' _onClick={openMenuModal} onClose={closeModal} />
            {menumodalVisible && (
              <Modal
                visible={menumodalVisible}
                closable={true}
                maskClosable={true}
                onClose={closeModal}
              >
                <MenuInsert onClose={closeModal} />
              </Modal>
            )}
          </Grid>
        </Brochure>
      </MenuOrder>
    </OwnerPermit>
  )
}

const TotalPrice = styled.button`
  position: fixed;
  bottom: 0;
  left: 0%;
  z-index: 9;
  width: 100%;
  background-color: #212121;
  color: #ffffff;
  padding: 12px 0px;
  box-sizing: border-box;
  border: none;
`
const MenuOrder = styled.div``
const Brochure = styled.div`
  display: ${props => (props.visibility ? 'block' : 'none')};
`
