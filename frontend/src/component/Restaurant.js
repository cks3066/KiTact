import React from "react";
import { Grid, Image, Text } from "../elements";
import Tags from "../elements/Tags";
import { MenuList } from "./MenuList";
import { useSelector, useDispatch } from "react-redux";
import { Seats } from "./Seats";

export const Restaurant = () => {
  const menu = useSelector((state) => state.menu);
  return (
    <div>
      <Grid padding="10px">
        <Grid is_flex>
          <Text label="대분류">{menu.info.large_category}</Text>
          <Text label="중분류">{menu.info.midium_category}</Text>
          <Text label="소분류">🍗 {menu.info.small_category}</Text>
          <Text label="상호" size="30px">
            {menu.info.name}
          </Text>
        </Grid>
        <Grid is_flex>
          <Text label="주소">🏍 {menu.info.address}</Text>
          <Text label="전화번호">📞 {menu.info.tel}</Text>
          <Text label="영업시간">⏰ {menu.info.time}</Text>
        </Grid>
        <Image shape="rectangle" src={menu.info.img} />
        <Grid>
          <Text label="매장상세설명">🥠 {menu.info.detail}</Text>
        </Grid>
        <Grid is_flex>
          <Tags></Tags>
        </Grid>
        <Grid>
          <Text label="좌석">💺 좌석을 선택해주세요.</Text>
          <Text label="전체좌석수">
            {menu.info.total_seat_count}개의 좌석 중 {menu.info.vacancy_count}
            좌석이 남아 있어요
            <Seats></Seats>
            {/* 
          좌석 그리드 
          점주 - 좌석 배정 및 편집 
          고객 - 좌석 선택 및 빈좌석 예약 
          
          창문, 출입구, 캐셔, 주방, 좌석수
        */}
          </Text>
        </Grid>
      </Grid>
      <Grid>
        <MenuList />
      </Grid>
    </div>
  );
};
