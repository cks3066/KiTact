import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

import { Text, Grid } from './index'

export const Input = props => {
  const { label, placeholder, _onChange, type, value, _onClick, width } = props

  return (
    <React.Fragment>
      <Grid>
        <Text margin='0px'>{label}</Text>
        <ElInput
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          value={value}
          onClick={_onClick}
          width={width}
        />
      </Grid>
    </React.Fragment>
  )
}

Input.defaultProps = {
  label: '텍스트',
  placeholder: '입력해주세요.',
  type: 'text',
  value: '',
  width: '100%',
  _onChange: () => {},
  _onClick: () => {},
}

const ElInput = styled.input`
  border: 1px solid #212121;
  width: ${props => props.width};
  padding: 12px 4px;
  box-sizing: border-box;
`
