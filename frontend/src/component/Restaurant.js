import React, { useState } from 'react'
import { Grid, Image, Input, Text } from '../elements'
import { Tags } from '../elements/Tags'
import { MenuList } from './MenuList'
import { useDispatch, useSelector } from 'react-redux'

import { Seats } from './Seats'
import { OwnerPermit } from '../shared/OwnerPermit'
import { Combobox } from '../elements/Combobox'
import { PostCode } from '../elements/PostCode'
import Modal from '../elements/Modal'
import { actionCreators as rAc } from '../redux/modules/restaurant'
import axios from 'axios'
import { Upload } from '../elements/Upload'

export const Restaurant = () => {
  axios.get('http://localhost:8080/test/time').then(res => {
    console.log(res)
  })
  const restaurant = useSelector(state => state.restaurant)
  const dispatch = useDispatch()

  const preview = useSelector(state => state.image.preview)

  const midium_category = restaurant.category.find(
    category => category.text === restaurant.info.large_category
  ).list

  const small_category = midium_category.find(
    category => category.text === restaurant.info.midium_category
  )

  const [postmodalVisible, setpostModalVisible] = useState(false)

  const openPostModal = () => {
    setpostModalVisible(true)
  }

  const closeModal = () => {
    setpostModalVisible(false)
  }

  const [name, setName] = useState('')
  const [img, setImg] = useState('')
  const [tel, setTel] = useState('')
  const [opentime, setOpentime] = useState('')
  const [closetime, setClosetime] = useState('')
  const [holiday, setHoliday] = useState('')
  const [detail, setDetail] = useState('')
  const [owner, setOwner] = useState('')

  const handleChange = (target, value) => {
    switch (target) {
      case 'name':
        setName(value)
        break
      case 'img':
        setImg(value)
        break
      case 'tel':
        setTel(value)
        break
      case 'opentime':
        setOpentime(value)
        break
      case 'closetime':
        setClosetime(value)
        break
      case 'holiday':
        setHoliday(value)
        break
      case 'detail':
        setDetail(value)
        break
      case 'owner':
        setOwner(value)
        break
      default:
        break
    }
    dispatch(rAc.updateInfo({ target: target, value: value }))
  }

  return (
    <OwnerPermit>
      <Grid padding='10px'>
        <Grid is_flex>
          <Combobox
            label='대분류'
            category={restaurant.category}
            selected={restaurant.info.large_category}
            position='large'
          />
          <Combobox
            label='중분류'
            category={midium_category}
            selected={restaurant.info.midium_category}
            position='midium'
          />
          <Combobox
            label='소분류'
            category={small_category ? small_category.list : undefined}
            selected={small_category ? restaurant.info.small_category : ''}
            position='small'
          />
          <Input
            label='전화번호'
            value={tel ? tel : restaurant.info.tel}
            _onChange={e => handleChange('tel', e.target.value)}
          />
          <Input
            label='상호'
            value={name ? name : restaurant.info.name}
            _onChange={e => handleChange('name', e.target.value)}
          />
          <Input
            label='대표자'
            value={owner ? owner : restaurant.info.owner}
            _onChange={e => handleChange('owner', e.target.value)}
          />
        </Grid>
        <Grid is_flex padding='10px'>
          <Input
            label='주소'
            value={restaurant.info.address}
            _onClick={openPostModal}
            width='328px'
          />
          <Input
            label='개점'
            value={opentime ? opentime : restaurant.info.opentime}
            _onChange={e => handleChange('opentime', e.target.value)}
            type='time'
          />
          <Input
            label='폐점'
            value={closetime ? closetime : restaurant.info.closetime}
            _onChange={e => handleChange('closetime', e.target.value)}
            type='time'
          />
          <Input
            label='휴일'
            value={holiday ? holiday : restaurant.info.holiday}
            _onChange={e => handleChange('holiday', e.target.value)}
          />
        </Grid>
        {postmodalVisible && (
          <Modal
            visible={postmodalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeModal}
          >
            <PostCode onClose={closeModal} />
          </Modal>
        )}
        <br />
        <Grid>
          <Image shape='rectangle' src={preview ? preview : restaurant.info.img} />
          <Upload />
          <Input
            label='매장상세설명'
            width='100%'
            value={detail ? detail : restaurant.info.detail}
            _onChange={e => handleChange('detail', e.target.value)}
          />
        </Grid>
        <Grid is_flex>
          <Tags tags={restaurant.info.tags} />
        </Grid>
        <Grid>
          <Text label='좌석'>💺 좌석을 선택해주세요.</Text>
          <Text label='전체좌석수'>
            {restaurant.info.total_seat_count}개의 좌석 중 {restaurant.info.vacancy_count}개의
            좌석이 남아 있어요
          </Text>
          <Seats />
        </Grid>
        <Grid>
          <MenuList />
        </Grid>
      </Grid>
      {/* ↑점주UI ================================================================================ ↓고객UI */}
      <Grid padding='10px'>
        <Grid is_flex>
          <Text label='대분류'>{restaurant.info.large_category}</Text>
          <Text label='중분류'>{restaurant.info.midium_category}</Text>
          <Text label='소분류'>🍗 {restaurant.info.small_category}</Text>
          <Text label='상호' size='30px'>
            {restaurant.info.name}
          </Text>
        </Grid>
        <Grid is_flex>
          <Text label='주소'>🏍 {restaurant.info.address}</Text>
          <Text label='전화번호'>📞 {restaurant.info.tel}</Text>
          <Text label='영업시간'>
            ⏰ {restaurant.info.opentime + '~' + restaurant.info.closetime}
          </Text>
          <Text label='휴일'>📞 {restaurant.info.holiday}</Text>
          <Text label='대표자'>대표자: {restaurant.info.owner}</Text>
        </Grid>
        <Image shape='rectangle' src={restaurant.info.img} />
        <Grid>
          <Text label='매장상세설명'>🥠 {restaurant.info.detail}</Text>
        </Grid>
        <Grid is_flex>
          <Tags tags={restaurant.info.tags} />
        </Grid>
        <Grid>
          <Text label='좌석'>💺 좌석을 선택해주세요.</Text>
          <Text label='전체좌석수'>
            {restaurant.info.total_seat_count}개의 좌석 중 {restaurant.info.vacancy_count}개의
            좌석이 남아 있어요
          </Text>
          <Seats />
        </Grid>
        <Grid>
          <MenuList />
        </Grid>
      </Grid>
    </OwnerPermit>
  )
}
