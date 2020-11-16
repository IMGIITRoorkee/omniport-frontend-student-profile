//package imports
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//local imports
import PublicApp from "./public_components/public_index";

//css imports
import "./index.css";

export default class AppRouter extends Component {
  render() {
    const { match } = this.props;
    return (
      <Router>
        <Route path={`${match.path}/:handle`} component={PublicApp} />
      </Router>
    );
  }
}
