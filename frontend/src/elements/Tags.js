import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as uAc } from '../redux/modules/restaurant'
import { useState } from 'react'
import { OwnerPermit } from '../shared/OwnerPermit'

export const Tags = props => {
  const { tags } = props
  const dispatch = useDispatch()

  const ENTER_KEY = 13
  const COMMA_KEY = 188
  const BACKSPACE_KEY = 8
  const [tagValue, setTagValue] = useState('')

  const handleKeyUp = e => {
    const key = e.keyCode
    if (key === ENTER_KEY || key === COMMA_KEY) {
      let tag = tagValue.trim().replace(/,/g, '')
      dispatch(uAc.addTag(tag))
      setTagValue((e.target.value = ''))
    }
  }

  const handleKeyDown = e => {
    if (e.keyCode === BACKSPACE_KEY) {
      dispatch(uAc.removeTag())
    }
  }

  return (
    <OwnerPermit>
      <TagForm>
        <Tag>
          <ul>{tags && tags.map((tag, index) => <li key={index}>{tag}</li>)}</ul>
          <input
            type='text'
            placeholder='여기에 태그를 입력하세요'
            onChange={e => {
              setTagValue(e.target.value)
            }}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
          />
        </Tag>
        <Small>
          태그하고 싶은 단어를 쓰고 <code>엔터</code> 나 <code>,</code> 를 입력하세요 <code>←</code>{' '}
          로 지울 수 있어요.
        </Small>
      </TagForm>
      <TagForm>
        <Tag>
          <ul>{tags && tags.map((tag, index) => <li key={index}>{tag}</li>)}</ul>
        </Tag>
      </TagForm>
    </OwnerPermit>
  )
}

const TagForm = styled.div`
  top: 8%;
  left: 50%;
  width: 100%;
  min-width: 700px;
  font-size: 16px;
  color: #222;
  background: #ecf0f1;
`

const Tag = styled.div`
  background: #fff;
  padding: 5px;
  overflow: hidden;
  input {
    padding: 5px 10px;
    box-sizing: border-box;
    color: #7f8c8d;
    border: 0;
    float: left;
    margin: 10px 0;
    font-size: 16px;
    outline: 0;
  }
  ul {
    list-style: none;
    li {
      color: #fff;
      font-weight: bold;
      background: #3498db;
      float: left;
      padding: 5px 10px;
      border-radius: 10em;
      margin: 5px;
      button {
        background: transparent;
        border: 0;
        cursor: pointer;
      }
    }
  }
`

const Small = styled.small`
  color: #7f8c8d;
  font-size: 14px;
  margin-top: 10px;
  display: block;
  line-height: 16px;
  code {
    font-size: 12px;
    background: #fcf8d0;
    display: inline-block;
    font-family: courier;
    padding: 4px 6px;
    border-radius: 4px;
  }
`
