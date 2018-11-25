import React, { Component } from "react";
import App from "./App";
import { Route } from "react-router-dom";
import "./index.css";

export default class AppRouter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { match } = this.props;
    return <Route path={`${match.path}/`} component={App} />;
  }
}
