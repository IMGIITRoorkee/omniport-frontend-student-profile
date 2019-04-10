import { combineReducers } from "redux";

import interestReducer from "./genericReducerMaker";

export default combineReducers({
  interest:interestReducer
});
