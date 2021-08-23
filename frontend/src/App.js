import React from "react";
import { BrowserRouter as ConnectedRouter, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { DashboardComponent } from "./DashboardComponent";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { TopMenuComponent } from "./component/TopMenuComponent";
import Connect from "./Connect";
import { history } from "./redux/configStore";
import { Order } from "./pages/Order";

function App() {
  <Connect />;
  return (
    <div className="App">
      <div>
        <TopMenuComponent />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Search} />
          <Route path="/order" component={Order} />
          <Route path="/dashboard" component={DashboardComponent} />
          <Route path="/map" component={Search} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </ConnectedRouter>
      </div>
    </div>
  );
}

export default App;
