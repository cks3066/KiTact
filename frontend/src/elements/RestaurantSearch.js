import React, { Fragment, useState } from "react";
import { Input, Row, Col } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as searchActions } from "../redux/modules/search";

const { Search } = Input;

const RestaurantSearch = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleButton = async () => {
    console.log("검색");
    axios
      .get('http://localhost:8080/restaurant/search?query='+query)
      .then(res => {
        console.log('검색 성공')
        console.log(res)
        dispatch(searchActions.setRestaurant(res.data.data));

      })
      .catch(error => {
        console.log('검색 get 에러')
        console.log(error.response)
      })
  };

  return (
    <Fragment>
        <Search
          placeholder="식당을 검색하세요."
          onSearch={(value) => console.log(value)}
          onChange={handleQuery}
          onClick={handleButton}
        />
    </Fragment>
  );
};
export default RestaurantSearch;