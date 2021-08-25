import React from 'react'
import { useSelector } from 'react-redux'

export const OwnerPermit = props => {
  const restaurant = useSelector(state => state.restaurant)
  const user = { id: 'asdfqwer' }
  //const user = useSelector(state => state.user)

  let childNumber = 0
  if (user.id === restaurant.info.id) {
  } else {
    childNumber = 1
  }
  return <React.Fragment>{props.children[childNumber]}</React.Fragment>
}
