import React from 'react'
import { useDispatch } from 'react-redux'
import { actionCreators as uAc } from '../redux/modules/restaurant'
import { OwnerPermit } from '../shared/OwnerPermit'
import { Button } from './Button'
import { Text } from './Text'

export const SeatsHeader = props => {
  const addItem = e => {
    dispatch(uAc.addSeat(props.id))
  }
  const dispatch = useDispatch()
  return (
    <OwnerPermit>
      <Button text={props.icon + ' ' + props.text} _onClick={addItem} height='60px' />
      <Text text={props.icon + ' ' + props.text} height='60px' />
    </OwnerPermit>
  )
}
