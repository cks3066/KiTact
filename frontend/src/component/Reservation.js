import React from 'react'
import { Button, Grid, Input } from '../elements'

export const Reservation = ({ onClose }) => {
  const close = e => {
    if (onClose) {
      onClose(e)
    }
  }

  return (
    <Grid>
      <Input type='time'></Input>
      <Button>예약하기</Button>
    </Grid>
  )
}
