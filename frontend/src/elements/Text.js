import React from "react";
import styled from "styled-components";

export const Text = (props) => {
  const { bold, color, size, margin, children } = props;
  const styles = {
    bold: bold,
    color: color,
    size: size,
    margin: margin,
  };
  return <P {...styles}>{children}</P>;
};

Text.defaultProps = {
  bold: false,
  color: "#222831",
  size: "14px",
  maring: false,
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? 600 : 400)};
  margin: ${(props) => (props.margin ? `${props.margin};` : "")};
`;
