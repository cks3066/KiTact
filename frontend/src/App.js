import React from "react";
import { BrowserRouter, Router, withRouter, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {DashboardComponent} from './DashboardComponent'
import Search from "./pages/Search";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { TopMenuComponent } from "./component/TopMenuComponent";
import { Restaurant } from "./component/Restaurant";
import Connect from "./Connect";
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
  <Connect />;
  return (
    <div className="App">
      <div>
        <TopMenuComponent />
        <BrowserRouter>
          <Route path="/" exact component={Search} />
          <Route path="/menulist" component={Restaurant} />
          <Route path="/dashboard" component={DashboardComponent} />
          <Route path="/map" component={Search} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToPOrops)(withRouter(App));
