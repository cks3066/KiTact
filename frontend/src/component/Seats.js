import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Button } from "../elements";
import { DraggableItem } from "../elements/DraggableItem";
import { actionCreators as uAc } from "../redux/modules/restaurant";

export const Seats = (props) => {
  const restaurant = useSelector((state) => state.restaurant);
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(false);
  const [countList, setCountList] = useState([0]);

  const addItem = (e) => {
    let countArr = [...countList];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter);
    setCountList(countArr);
  };

  const toggleDraggable = () => {
    dispatch(uAc.seatEditToggle());
    setDisabled((disabled) => !disabled);
  };

  return (
    <div>
      <Grid is_flex _onClick={addItem}>
        {restaurant.info.seats_rull.map((rull, index) => (
          <Button key={index} text={rull.icon + "\n" + rull.text} />
        ))}
        <Button
          _onClick={toggleDraggable}
          text={restaurant.info.seat_edit_toggle ? "🔐편집하기" : "🔓잠그기"}
        >
          {disabled ? "Enable" : "Disable"}
        </Button>
      </Grid>
      <SeatContainer>
        {restaurant.info.seats.map((seat, index) => (
          <DraggableItem key={index} {...seat} />
        ))}
      </SeatContainer>
    </div>
  );
};

const SeatContainer = styled.div`
  width: 100%;
  height: 550px;
  background-color: #e4e5e6;
  background-image: url("../../public/logo192.png");
  background-repeat: repeat-x;
`;
