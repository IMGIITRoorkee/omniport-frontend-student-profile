import React, { Component } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { Route } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { Decider } from "./decider";

import rootReducers from "./reducers";

import "./index.css";

export default class AppRouter extends Component {
  constructor(props) {
    super(props);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    this.store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));
    let store = this.store;
    store.subscribe(() => console.log(store.getState().interest));
  }
  render() {
    const { match } = this.props;
    return (
      <Provider store={this.store}>
        <Router>
          <Route path={`${match.path}/`} component={Decider} />
        </Router>
      </Provider>
    );
  }
}
