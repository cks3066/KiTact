import React from 'react'
import { Grid, Image, Text } from '../elements'
import { Tags } from '../elements/Tags'
import { MenuList } from './MenuList'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as uAc } from '../redux/modules/restaurant'

import { DataGrid } from './DragGrid'
import { Seats } from './Seats'

export const Restaurant = () => {
  const restaurant = useSelector(state => state.restaurant)
  return (
    <div>
      <Grid padding='10px'>
        <Grid is_flex>
          <Text label='대분류'>{restaurant.info.large_category}</Text>
          <Text label='중분류'>{restaurant.info.midium_category}</Text>
          <Text label='소분류'>🍗 {restaurant.info.small_category}</Text>
          <Text label='상호' size='30px'>
            {restaurant.info.name}
          </Text>
        </Grid>
        <Grid is_flex>
          <Text label='주소'>🏍 {restaurant.info.address}</Text>
          <Text label='전화번호'>📞 {restaurant.info.tel}</Text>
          <Text label='영업시간'>⏰ {restaurant.info.time}</Text>
        </Grid>
        <Image shape='rectangle' src={restaurant.info.img} />
        <Grid>
          <Text label='매장상세설명'>🥠 {restaurant.info.detail}</Text>
        </Grid>
        <Grid is_flex>
          <Tags></Tags>
        </Grid>
        <Grid>
          <Text label='좌석'>💺 좌석을 선택해주세요.</Text>
          <Text label='전체좌석수'>
            {restaurant.info.total_seat_count}개의 좌석 중 {restaurant.info.vacancy_count}
            좌석이 남아 있어요
            {/* <DataGrid></DataGrid> */}
            <Seats />
          </Text>
        </Grid>
      </Grid>
      <Grid>
        <MenuList />
      </Grid>
    </div>
  )
}
