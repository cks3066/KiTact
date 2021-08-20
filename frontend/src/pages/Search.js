import React from "react";
import ShowMap from "../elements/ShowMap";
import styled from "styled-components";
import SearchBox from "../elements/SearchBox";


const Search = (props) => {
  return (
    <React.Fragment>
        <SearchBox />
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

export default Search;
