import React, { Fragment, useState } from "react";
import jsonData from "./item.json";
import { Input, Row, Col } from "antd";
import axios from "axios";
const { Search } = Input;
const RestaurantSearch = () => {
  const [query, setQuery] = useState("");
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };
  const [items, setItems] = useState();

  const handleButton = async () => {
    try {
      const res = await axios.get("http://localhost:3000/naver/getNaverMovie", {
        params: {
          query: query,
        },
      });
      if (res && res.status === 200) {
        const { data } = res;
        console.log(data);
        setItems(data.items);
      }
    } catch (e) {
      console.log("error ", e);
    }
  };

  return (
    <Fragment>
        <Search
          placeholder="식당을 검색하세요."
          onSearch={(value) => console.log(value)}
          onChange={handleQuery}
          onClick={handleButton}
          style={{ width: 200 }}
        />
    </Fragment>
  );
};
export default RestaurantSearch;