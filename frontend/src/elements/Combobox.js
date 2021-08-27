import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { actionCreators as uAc } from '../redux/modules/restaurant'
import { Grid } from './Grid'
import { Text } from './Text'

export const Combobox = props => {
  const { label, _onChange } = props

  const dispatch = useDispatch()

  const handleChange = value => {
    dispatch(uAc.updateCategory({ category: props.position, text: value }))
    _onChange(value)
  }
  if (props.category === undefined || !props.category) return <React.Fragment />
  return (
    <Grid>
      <Text margin='0px'>{label}</Text>
      <Select value={props.selected} onChange={e => handleChange(e.target.value)}>
        {props.category.map(option => (
          <option key={option.id} value={option.text}>
            {option.text}
          </option>
        ))}
      </Select>
    </Grid>
  )
}

Combobox.defaultProps = {
  label: '텍스트',
}

const Select = styled.select`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`
