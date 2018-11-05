import { combineReducers } from "redux";
import { InterestReducer } from "./interest";

export const Root = combineReducers({
  Interest: InterestReducer
});
