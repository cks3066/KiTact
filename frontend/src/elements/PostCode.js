import React from 'react'
import DaumPostCode from 'react-daum-postcode'
import { useDispatch } from 'react-redux'
import { actionCreators as uAc } from '../redux/modules/restaurant'

export const PostCode = ({ onClose, props }) => {
  const dispatch = useDispatch()
  const close = e => {
    if (onClose) {
      onClose(e)
    }
  }
  const handleComplete = data => {
    let fullAddress = data.address
    let extraAddress = ''
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }
    dispatch(uAc.updateAddress(fullAddress))
    close()
  }
  return <DaumPostCode onComplete={handleComplete} className='post-code' />
}
