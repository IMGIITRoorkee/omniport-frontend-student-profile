import React, { Component } from "react";
import App from "./App";
import { Route } from "react-router-dom";
import "./index.css";
import { createStore, applyMiddleware, compose } from "redux";
import { Root } from "./reducers/root";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { getDataList, updateData } from "./actions/dataOperations";

export default class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.store = createStore(Root, applyMiddleware(thunk));
    this.store.dispatch(getDataList("Interest"));
    // const part = "Interest";
    // const data = {
    //   id: 33,
    //   student: "shreyansh(s)",
    //   topics: "sdfsa"
    // };
    // const del = true;

    // this.store.dispatch(updateData(part, data, del));
  }

  render() {
    const { match } = this.props;
    return (
      <Provider store={this.store}>
        <Route path={`${match.path}/`} component={App} />
      </Provider>
    );
  }
}
