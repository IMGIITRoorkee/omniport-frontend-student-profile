import React, { Component } from "react";
import App from "./App";
import { Route } from "react-router-dom";
import "./index.css";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { Root } from "./reducers/RootReducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.store = createStore(Root, composeEnhancers(applyMiddleware(thunk)));
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
