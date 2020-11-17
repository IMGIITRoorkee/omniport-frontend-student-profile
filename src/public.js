//package imports
import React, { Component } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter as Router, Route } from "react-router-dom";

import rootReducers from "./reducers";
//local imports
import PublicApp from "./public_components/public_index";
//css imports
import "./index.css";

export default class AppRouter extends Component {
    constructor(props) {
        super(props);
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        this.store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));
    }
    render() {
        const { match } = this.props;
        return (
            <Provider store={this.store}>
                <Router>
                    <Route path={`${match.path}/:handle`} component={PublicApp} />
                </Router>
            </Provider>
        );
    }
}
