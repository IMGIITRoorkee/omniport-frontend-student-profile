import { combineReducers } from "redux";

import { genericReducerMaker } from "./genericReducerMaker";
import { appDetailsReducer } from "./appDetails";
import { components } from "../constants/genericComponents";

let reducerMap = {};
reducerMap["appDetails"] = appDetailsReducer;
for (let index in components) {
  let componentName = components[index];
  reducerMap[componentName] = genericReducerMaker(componentName);
}

export default combineReducers(reducerMap);
