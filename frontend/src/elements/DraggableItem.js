import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as uAc } from "../redux/modules/restaurant";

export const DraggableItem = (props) => {
  const restaurant = useSelector((state) => state.restaurant);

  const dispatch = useDispatch();
  const nodeRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleEnd = (seat) => {
    const seat_info = {
      id: props.id,
      vacancy: props.vacancy,
      x: position.x.toFixed(),
      y: position.y.toFixed(),
    };
    dispatch(uAc.updateSeat(seat_info));
  };

  const updateSeat = (seat) => {
    const seat_info = {
      id: props.id,
      vacancy: !props.vacancy,
      x: position.x.toFixed(),
      y: position.y.toFixed(),
    };
    dispatch(uAc.updateSeat(seat_info));
  };

  return (
    <Draggable
      disabled={restaurant.info.seat_edit_toggle}
      nodeRef={nodeRef}
      onDrag={(e, data) => trackPos(data)}
      onStop={handleEnd}
      defaultPosition={{ x: props.x, y: props.y }}
    >
      <Item onClick={updateSeat} ref={nodeRef}>
        {isNaN(props.id) ? "" : props.vacancy ? "🍽" : "🍴"}
        {props.icon}
      </Item>
    </Draggable>
  );
};

const Item = styled.div`
  width: 30px;
  height: 30px;
  max-width: 30px;
  max-height: 30px;
  pointer-events: auto;
  z-index: 9;
  cursor: pointer;
  border: 4px solid #434224;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
`;
