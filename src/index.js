import React, { Component } from "react";
import App from "./App";
import { Route } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./index.css";
import { Decider } from "./decider";

export default class AppRouter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { match } = this.props;
    return (
      <Router>
        <Route path={`${match.path}/`} component={Decider} />
      </Router>
    );
  }
}
