import React, { useState, useRef, setState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import { Button } from "./Button";
import { Grid } from "./Grid";

export const DraggableItem = (props) => {
  const nodeRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [Opacity, setOpacity] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleStart = () => {
    setOpacity(true);
  };
  const handleEnd = () => {
    setOpacity(false);
  };

  const toggleDraggable = () => {
    setDisabled((disabled) => !disabled);
  };

  return (
    <Outer>
      {props.countList &&
        props.countList.map((item, i) => (
          <Draggable
            disabled={disabled}
            bounds={{ top: 0, left: 0, right: 600, bottom: 400 }}
            nodeRef={nodeRef}
            onDrag={(e, data) => trackPos(data)}
            onStart={handleStart}
            onStop={handleEnd}
          >
            <div ref={nodeRef} style={{ opacity: Opacity ? "0.6" : "1" }}>
              <Item>
                <div></div>
                <div>
                  <span>
                    x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
                  </span>
                </div>
                <Grid is_flex>
                  <Button _onClick={toggleDraggable} text="✔">
                    {disabled ? "Enable" : "Disable"}
                  </Button>
                  <Button text="🍽" />
                </Grid>
              </Item>
            </div>
          </Draggable>
        ))}
    </Outer>
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
  border: 1px solid;
`;

const Outer = styled.div`
  width: 595px;
  height: 500px;
  max-width: 595px;
  max-height: 500px;
`;
