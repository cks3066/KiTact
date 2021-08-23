import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
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

  const removeSeat = () => {
    dispatch(uAc.removeSeat({ id: props.id }));
  };

  return (
    <Draggable
      disabled={restaurant.info.seat_edit_toggle}
      nodeRef={nodeRef}
      onDrag={(e, data) => trackPos(data)}
      onStop={handleEnd}
      defaultPosition={{ x: props.x, y: props.y }}
    >
      <Item>
        <div onClick={updateSeat} ref={nodeRef}>
          {isNaN(props.id) ? "" : props.vacancy ? "🍽" : "🍴"}
        </div>
        {props.icon}
        <HideButtonSet>
          <HideButton>✔</HideButton>
          <HideButton>⚙</HideButton>
          <HideButton onClick={removeSeat}>❌</HideButton>
        </HideButtonSet>
      </Item>
    </Draggable>
  );
};

const bounce = keyframes`
  0% {
    transform: scale(0)
  }
  100% {
    transform: scale(1)
  }
`;

const HideButton = styled.button`
  display: none;
  font-size: 25px;
  width: 50px;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  border: none;
  position: relative;
  right: 55px;
  :nth-child(2) {
    top: 10px;
  }
`;

const Item = styled.div`
  width: 50px;
  height: 50px;
  max-width: 50px;
  max-height: 50px;
  pointer-events: auto;
  z-index: 9;
  cursor: pointer;
  border: 4px solid #434224;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  font-size: 30px;
  :hover {
    font-size: 32px;
    ${HideButton} {
      display: block;
      animation: ${bounce} 1s;
    }
  }
`;

const HideButtonSet = styled.div`
  position: absolute;
  left: -10;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
