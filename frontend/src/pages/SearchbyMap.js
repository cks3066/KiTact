import React from "react";
import { Grid } from "../elements";
import ShowMap from "../elements/ShowMap";
import styled from "styled-components";

const SearchbyMap = (props) => {
  return (
    <React.Fragment>
      <Cent>
        <ShowMap />
      </Cent>
    </React.Fragment>
  );
};

const Cent = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SearchbyMap;
