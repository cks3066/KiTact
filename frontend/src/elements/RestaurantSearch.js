import React, { Fragment, useState } from 'react'
import { Input } from 'antd'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import { actionCreators as searchActions } from '../redux/modules/search'

const { Search } = Input

const RestaurantSearch = () => {
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')

  const handleQuery = e => {
    setQuery(e.target.value)
  }

  const handleButton = async () => {
    axios
      .get('http://localhost:8080/restaurant/search?query=' + query)
      .then(res => {
        dispatch(searchActions.setRestaurant(res.data.data))

        window.naver.maps.Service.geocode(
          {
            address: res.data.data.address,
          },
          function (status, response) {
            if (status !== window.naver.maps.Service.Status.OK) {
              return alert('Something wrong!')
            }

            var result = response.result, // 검색 결과의 컨테이너
              items = result.items // 검색 결과의 배열

            // do Something
            dispatch(searchActions.setCoordinate(items[0].point))
          }
        )
      })
      .catch(error => {
        console.log('검색 get 에러')
        console.log(error.response)
      })
  }

  return (
    <Fragment>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
        <Search placeholder='식당을 검색하세요.' onSearch={handleButton} onChange={handleQuery} enterButton/>
      </div>
    </Fragment>
  )
}
export default RestaurantSearch
