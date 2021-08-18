import React from "react";
import styled from "styled-components";
import { Menu } from "./Menu";
import { useSelector, useDispatch } from "react-redux";

export const MenuList = () => {
  const menu = useSelector((state) => state.menu);
  return (
    <div>
      {menu.list.map((menu, index) => (
        <Menu menu={menu} key={index} />
      ))}
      <TotalPrice>
        <b>₩ {new Intl.NumberFormat().format(menu.total_price)}원</b>
      </TotalPrice>
    </div>
  );
};

const TotalPrice = styled.p`
  position: fixed;
  align-content: center;
  left: 0px;
  bottom: 0px;
  height: 60px;
  width: 100%;
  background: grey;
  color: white;
`;
