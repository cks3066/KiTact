import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Grid, Button } from '../elements'
import { DraggableItem } from '../elements/DraggableItem'
import { SeatsHeader } from '../elements/SeatsHeader'
import { actionCreators as uAc } from '../redux/modules/restaurant'
import img from '../static_img/tiles-bg.png'

export const Seats = props => {
  const restaurant = useSelector(state => state.restaurant)
  const dispatch = useDispatch()

  const [rullId, setRullId] = useState('')

  const toggleDraggable = () => {
    dispatch(uAc.seatEditToggle())
  }

  return (
    <div>
      <Grid is_flex>
        {restaurant.info.seats_rull.map((rull, index) => (
          <SeatsHeader key={index} id={rull.id} text={rull.icon + '\n' + rull.text}></SeatsHeader>
        ))}
        <Button
          _onClick={toggleDraggable}
          text={restaurant.info.seat_edit_toggle ? '🔐편집하기' : '🔓잠그기'}
        ></Button>
      </Grid>
      <SeatContainer>
        {restaurant.info.seats.map((seat, index) => (
          <DraggableItem key={index} {...seat} />
        ))}
      </SeatContainer>
    </div>
  )
}

const SeatContainer = styled.div`
  width: 100%;
  height: 500px;
  background-color: #e4e5e6;
  background-image: url(${img});
  background-position: center bottom;
  background-repeat: repeat-x;
  border-radius: 0 0 13px 13px;
`
