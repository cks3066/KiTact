import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, Image, Input, Text } from '../elements'
import { Combobox } from '../elements/Combobox'
import Modal from '../elements/Modal'
import { PostCode } from '../elements/PostCode'
import { Tags } from '../elements/Tags'
import { Upload } from '../elements/Upload'
import { actionCreators as rAc } from '../redux/modules/restaurant'

export const NewRestaurant = () => {
  const restaurant = useSelector(state => state.restaurant)
  const dispatch = useDispatch()
  const default_empty_img = useSelector(state => state.image.default_empty_image)

  const preview = useSelector(state => state.image.preview)

  const [postmodalVisible, setpostModalVisible] = useState(false)

  const openPostModal = () => {
    setpostModalVisible(true)
  }

  const closeModal = () => {
    setpostModalVisible(false)
  }

  const [name, setName] = useState('')
  const [tel, setTel] = useState('')
  const [opentime, setOpentime] = useState('')
  const [closetime, setClosetime] = useState('')
  const [holiday, setHoliday] = useState('')
  const [detail, setDetail] = useState('')
  const [owner, setOwner] = useState('')
  const [address, setAddress] = useState('')
  const [largeCategory, setLargeCategory] = useState('식당')
  const [midiumCategory, setMidiumCategory] = useState('한식')
  const [smallCategory, setSmallCategory] = useState('백반')
  const [tags, setTags] = useState()

  const midium_category = largeCategory
    ? restaurant.category.find(category => category.text === largeCategory).list
    : restaurant.category[0].list

  const small_category = midium_category.find(category => category.text === midiumCategory)

  const addInfo = () => {
    dispatch(
      rAc.addInfoWithFB({
        large_category: largeCategory,
        midium_category: midiumCategory,
        small_category: smallCategory,
        name: name,
        tel: tel,
        opentime: opentime,
        closetime: closetime,
        owner: owner,
        address: address,
        holiday: holiday,
        detail: detail,
        tags: tags,
        total_seat_count: 0,
        vacancy_count: 0,
      })
    )
  }

  return (
    <Grid>
      <Grid is_flex padding='10px 0px'>
        <Combobox
          label='대분류'
          category={restaurant.category}
          position='large'
          _onChange={setLargeCategory}
        />
        <Combobox
          label='중분류'
          category={midium_category}
          position='midium'
          _onChange={setMidiumCategory}
        />
        <Combobox
          label='소분류'
          category={small_category ? small_category.list : undefined}
          position='small'
          _onChange={setSmallCategory}
        />
        <Input label='상호' value={name} _onChange={e => setName(e.target.value)} />
      </Grid>
      <Grid is_flex padding='10px 0px'>
        <Input label='전화번호' value={tel} _onChange={e => setTel(e.target.value)} />
        <Input
          label='개점 시간'
          value={opentime}
          _onChange={e => setOpentime(e.target.value)}
          type='time'
        />
        <Input
          label='폐점 시간'
          value={closetime}
          _onChange={e => setClosetime(e.target.value)}
          type='time'
        />
        <Input label='대표자' value={owner} _onChange={e => setOwner(e.target.value)} />
      </Grid>
      <Grid is_flex padding='10px 0px'>
        <Input label='주소' value={address} _onClick={openPostModal} width='328px' />
        <Input label='휴일' value={holiday} _onChange={e => setHoliday(e.target.value)} />
      </Grid>
      {postmodalVisible && (
        <Modal visible={postmodalVisible} closable={true} maskClosable={true} onClose={closeModal}>
          <PostCode onClose={closeModal} setAddress={setAddress} />
        </Modal>
      )}
      <br />
      <Grid padding='10px 0px'>
        <Text>매장을 대표하는 이미지를 등록해주세요</Text>
        <Image shape='rectangle' src={preview ? preview : default_empty_img}></Image>
        <Upload need_button={false} />
      </Grid>
      <Grid padding='10px 0px'>
        <Input
          label='매장을 소개하는 글을 입력해주세요'
          value={detail}
          width='100%'
          _onChange={e => setDetail(e.target.value)}
        />
      </Grid>
      <Grid is_flex padding='10px 0px'>
        <Tags tags={restaurant.info.tags} />
      </Grid>
      <Button text='입력 완료' _onClick={addInfo} />
    </Grid>
  )
}
