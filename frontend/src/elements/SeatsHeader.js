import React from 'react'
import { useDispatch } from 'react-redux'
import { actionCreators as uAc } from '../redux/modules/restaurant'
import { Button } from './Button'

export const SeatsHeader = props => {
  const addItem = e => {
    dispatch(uAc.addSeat(props.id))
  }
  const dispatch = useDispatch()
  return <Button text={props.text} _onClick={addItem} />
}
