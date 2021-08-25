import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Image, Input } from '../elements'
import { Upload } from '../elements/Upload'
import { actionCreators as uAc } from '../redux/modules/restaurant'

export const MenuInsert = ({ onClose, props }) => {
  const preview = useSelector(state => state.image.preview)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const dispatch = useDispatch()
  const close = e => {
    if (onClose) {
      onClose(e)
    }
  }
  return (
    <Grid>
      <Grid is_flex>
        <Input label='메뉴 이름' width='90%' onChange={e => setName(e.target.value)} />
        <Input label='가격' width='70%' onChange={e => setPrice(e.target.value)} />
      </Grid>
      <Image
        shape='rectangle'
        src={
          preview
            ? preview
            : 'http://www.kyochon.com/uploadFiles/TB_ITEM/%EB%B8%8C%EB%9E%9C%EB%93%9C_list_15-10-221047(3).png'
        }
      />
      <Upload />
    </Grid>
  )
}
