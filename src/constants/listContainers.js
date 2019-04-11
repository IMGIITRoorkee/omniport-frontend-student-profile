import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./../containers/interestList";
import { listComponents } from "./listComponents";
import { components } from "./components";

let list = {};
for (let index in components) {
  let componentName = components[index];
  list[componentName] = connect(
    mapStateToProps,
    mapDispatchToProps
  )(listComponents[componentName]);
}

export const listContainers = list;
