import React from "react";
import { BrowserRouter, Router, withRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { TopMenuComponent } from "./component/TopMenuComponent";
import { Restaurant } from "./component/Restaurant";
import MainComponent from "./MainComponent";
import { connect } from "react-redux";
import {
  loadMenu,
  createMenu,
  calculate,
  increment,
  decrement,
} from "./redux/modules/menu";

const mapStateToProps = (state) => {
  return { menu_list: state.menu.list };
};

const mapDispatchToPOrops = (dispatch) => {
  return {
    load: () => {
      dispatch(loadMenu());
    },
    create: (menu) => {
      dispatch(createMenu(menu));
    },
    calculate: (menu) => {
      dispatch(calculate(menu));
    },
    increment: (index) => {
      dispatch(increment(index));
    },
    decrement: (index) => {
      dispatch(decrement(index));
    },
  };
};
function App() {
  return (
    <div className="App">
      <div>
        <TopMenuComponent />
        <MainComponent />
        <Restaurant />
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToPOrops)(withRouter(App));
