import React from "react";
import { render } from "react-dom";
import Home from "./home";
import Packages from "./packages";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import "./styles.scss";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/package/:packageType">
          <Packages />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

render(<App />, document.getElementById("app"));
