import { combineReducers } from "redux";

import { genericReducerMaker } from "./genericReducerMaker";
import { appDetailsReducer } from "./appDetails";
import { components } from "../constants/genericComponents";

let reducerMap = {};
for (let index in components) {
  let componentName = components[index];
  reducerMap[componentName] = genericReducerMaker(componentName);
}
reducerMap["appDetails"] = appDetailsReducer;

export default combineReducers(reducerMap);
