import React, { Component } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import thunk from "redux-thunk";
import { Route } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { Decider } from "./decider";

import rootReducers from "./reducers";

import "./index.css";
import { fetchInterests } from "./actions";

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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => console.log(store.getState().interest));

store.dispatch({ type: "ADD_INTEREST", item: { a: 2 } });

store.dispatch({ type: "ADD_INTEREST", item: { a: 2 } });

store.dispatch({ type: "ADD_INTEREST", item: { a: 2 } });

store.dispatch({ type: "ADD_INTEREST", item: { a: 2 } });

store.dispatch(fetchInterests());
