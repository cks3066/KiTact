import React from 'react'
import styled from 'styled-components'

export const Button = props => {
  const {
    text,
    _onClick,
    is_float,
    children,
    margin,
    width,
    padding,
    height,
    font_size,
    bottom,
    absolute,
    sticky,
  } = props

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    height: height,
    font_size: font_size,
    bottom: bottom,
    absolute: absolute,
    sticky: sticky,
  }

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  )
}

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: '100%',
  padding: '12px 0px',
  height: '100%',
  font_size: '13px',
  bottom: '',
  absolute: '',
}

const ElButton = styled.button`
  width: ${props => props.width};
  background-color: #212121;
  color: #ffffff;
  padding: 12px 0px;
  box-sizing: border-box;
  border: none;
  padding: ${props => props.padding};
  ${props => (props.margin ? `margin: ${props.margin};` : '')}
  ${props => (props.height ? `height: ${props.height};` : '')}
  ${props => (props.font_size ? `font-size: ${props.font_size};` : '')}
  ${props => (props.bottom ? `bottom: ${props.bottom};position:fixed;` : '')}
  ${props => (props.absolute ? `position:fixed;` : '')}
  ${props =>
    props.sticky
      ? `position: -webkit-sticky;
         position: sticky;
         top: 0;`
      : ''}
`

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 150px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
`
