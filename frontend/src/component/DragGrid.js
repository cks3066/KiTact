import { array } from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { actionCreators as uAc } from '../redux/modules/restaurant'
import img from '../static_img/tiles-bg.png'

export const DataGrid = () => {
  const restaurant = useSelector(state => state.restaurant)
  const dispatch = useDispatch()

  const addItem = e => {
    console.log(e.target.value)
  }

  const toggleDraggable = () => {
    dispatch(uAc.seatEditToggle())
  }

  return (
    <div>
      <TableGrid>
        <thead>
          <tr>
            {restaurant.info.seats_rull.map((rull, index) => (
              <th>
                <button key={index} onClick={addItem}>
                  {rull.icon + '\n' + rull.text}
                </button>
              </th>
            ))}
            <th>
              <button onClick={toggleDraggable}>
                {restaurant.info.seat_edit_toggle ? '🔐편집하기' : '🔓잠그기'}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {restaurant.info.seats.map((seat, index) => (
            <div key={index} draggable='true'>
              {seat.icon}
            </div>
          ))}
          <tr>
            <td></td>
          </tr>
        </tbody>
      </TableGrid>

      {/* <SeatContainer>
        {restaurant.info.seats.map((seat, index) => (
          <DraggableItem key={index} {...seat} />
        ))}
      </SeatContainer> */}
    </div>
  )
}

const TableGrid = styled.table`
  width: 100%;
  height: 500px;
  background-color: #e4e5e6;
  background-image: url(${img});
  background-position: center bottom;
  background-repeat: repeat-x;
  border-radius: 0 0 13px 13px;
`
