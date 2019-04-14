import React from "react";
import { connect } from "react-redux";

import { components } from "./genericComponents";

const mapStateToProps = state => {
  return { appDetails: state.appDetails };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const list = {};
for (let index in components) {
  let componentName = components[index];
  let displayComponent = import(`../components/displayComponents/${componentName}`);
  list[componentName] = connect(
    mapStateToProps,
    mapDispatchToProps
  )(displayComponent);
}
export const displayContainers = list;
