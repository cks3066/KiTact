import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/Grid";
import { Image } from "../elements/Image";
import { useDispatch } from "react-redux";
import { actionCreators as uAc } from "../redux/modules/restaurant";

export const Menu = ({ menu }) => {
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    console.log("menu", menu);
    dispatch(uAc.incrementMenuQuantity(menu.id));
    dispatch(uAc.calculateTotalPrice(menu.id));
  };

  const decreaseQuantity = () => {
    dispatch(uAc.decrementMenuQuantity(menu.id));
    dispatch(uAc.calculateTotalPrice(menu.id));
  };

  return (
    <React.Fragment>
      <Grid padding="16px" key={menu.index}>
        <Grid is_flex>
          <Image shape="rectangle" src={menu.src}></Image>
        </Grid>
        <Grid>
          <Service>
            <MenuPanel onClick={increaseQuantity} isActive={menu.active}>
              {menu.name}
              <b>₩ {new Intl.NumberFormat().format(menu.price)}원</b>
            </MenuPanel>
            <QuantityInput>
              <UpQuantityButton onClick={increaseQuantity}>
                &#xff0b;
              </UpQuantityButton>
              <QuantityScreen>{menu.quantity}</QuantityScreen>
              <DownQuantityButton onClick={decreaseQuantity}>
                &mdash;
              </DownQuantityButton>
            </QuantityInput>
          </Service>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Service = styled.div`
  list-style: none;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuPanel = styled.p`
  width: 90%;
  padding: 28px 20px;
  margin-bottom: 3px;
  position: relative;
  cursor: pointer;
  transition: 0.3s;
  ${(props) =>
    props.isActive
      ? "background-color: #41c7c2; color:#fff;"
      : "background-color: #F8F8F8; color: #7B8585;"};
  &:hover {
    ${(props) =>
      props.isActive
        ? "background-color: #41d7c8; color:#fffc;"
        : "background-color: #d8f2f1; color: #7B8585;"};
  }
  > b {
    position: absolute;
    right: 50px;
    line-height: 16px;
    width: 100px;
    color: #808787;
    text-align: right;
    ${(props) => (props.isActive ? "color: #fff" : "color: #808787")};
  }
`;

const QuantityInput = styled.div`
  border-radius: 3px;
  width: 10%;
  height: 100%;
  &:focus {
    background: red;
  }
  > button {
    background: #f3f3f3;
    color: #888;
    border: 0 solid #dbdbdb;
    text-align: center;
    text-shadow: 0 1px 0 rgba(#fff, 0.6);
    cursor: pointer;
    &:hover {
      ${(props) =>
        props.isActive
          ? "background-color: #41d7c8; color:#fffc;"
          : "background-color: #d8f2f1; color: #7B8585;"};
    }
  }
`;

const UpQuantityButton = styled.button`
  width: 100%;
  height: 30%;
  border-radius: 0 0 2px 0;
`;

const DownQuantityButton = styled.button`
  width: 100%;
  height: 30%;
  border-radius: 2px 0 0 2px;
`;

const QuantityScreen = styled.div`
  width: 100%;
  height: 30%;
  text-align: center;
`;
