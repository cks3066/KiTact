import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { TopMenuComponent } from "../component/TopMenuComponent";
import Main from "../pages/Main";
import { DashboardComponent } from "./DashboardComponent";
import SearchbyMap from "../pages/SearchbyMap";

function App() {
  return (
    <div className="App">
      <div>
        <TopMenuComponent />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </ConnectedRouter>
      </div>
    </div>
  );
}
{
  /* <React.Fragment>
<Grid>
  <Header></Header>
  <ConnectedRouter history={history}>
    <Route path="/" exact component={PostList} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
  </ConnectedRouter>
</Grid>
</React.Fragment>
) */
}
export default App;
