import React from "react";
import { Grid } from "../elements/Grid";
import { MenuList } from "./MenuList";
import Tags from "./Tags";

export const Restaurant = () => {
  return (
    <div>
      <Grid padding="10px">
        <Tags></Tags>
      </Grid>
      <Grid>
        <MenuList />
      </Grid>
      미구현 레이아웃 / 카테고리(식당) 식당 정보(주소, 상호, 전화번호, 영업시간,
      [좌표]) / 좌석(인원 수, 특징) / 메뉴 (이름, 가격) / 태그(식당)
    </div>
  );
};
