import React from 'react'
import { Combobox } from '../elements/Combobox'

export const Category = props => {
  return (
    <div>
      <Combobox props={props} />
      <Combobox props={props} />
      <Combobox props={props} />
    </div>
  )
}
