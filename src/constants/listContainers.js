import { connect } from "react-redux";
import {
  mapDispatchToProps,
  _mapStateToProps
} from "../utils/genericConnectorFunctions";
import { listComponents } from "./listComponents";
import { components } from "./genericComponents";

let list = {};
for (let index in components) {
  let componentName = components[index];
  list[componentName] = connect(
    _mapStateToProps(componentName),
    mapDispatchToProps
  )(listComponents[componentName]);
}

export const listContainers = list;
