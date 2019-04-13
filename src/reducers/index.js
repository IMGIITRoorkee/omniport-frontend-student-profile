import { combineReducers } from "redux";
import { genericReducerMaker } from "./genericReducerMaker";

export default combineReducers({
  interest: genericReducerMaker("interest"),
  achievement: genericReducerMaker("achievement")
});
