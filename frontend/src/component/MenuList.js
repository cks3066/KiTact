import React from "react";
import styled from "styled-components";
import { Menu } from "./Menu";
import { useSelector } from "react-redux";

export const MenuList = () => {
  const restaurant = useSelector((state) => state.restaurant);
  return (
    <div>
      {restaurant.menu_list.map((menu, index) => (
        <Menu menu={menu} key={index} />
      ))}
      <br />
      <TotalPrice>
        <b>
          글제 금액 ₩ {new Intl.NumberFormat().format(restaurant.total_price)}원
        </b>
      </TotalPrice>
    </div>
  );
};

const TotalPrice = styled.div`
  position: fixed;
  text-align: center;
  bottom: 0;
  height: 40px;
  width: 60%;
  background: grey;
  color: white;
`;
