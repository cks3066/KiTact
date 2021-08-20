import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Button } from "../elements";
import { DraggableItem } from "../elements/DraggableItem";

export const Seats = (props) => {
  const [countList, setCountList] = useState([0]);

  const addItem = (e) => {
    console.log(e.target.value);
    let countArr = [...countList];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter); // index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
    setCountList(countArr);
  };
  return (
    <div>
      <Grid is_flex _onClick={addItem}>
        <Button text="1명🙋‍♂️" />
        <Button text="2명👨‍❤️‍👨" />
        <Button text="3명👨‍👩‍👧" />
        <Button text="4명👨‍👩‍👧‍👧" />
        <Button text="출입구🚪" />
        <Button text="계산💰" />
        <Button text="주방👩‍🍳" />
      </Grid>
      <DraggableItem countList={countList} />
      <SeatContainer />
    </div>
  );
};

Seats.defaultProps = {};

const SeatContainer = styled.div`
  width: 595px;
  height: 500px;
  max-width: 595px;
  max-height: 500px;
  z-index: -1;
`;
