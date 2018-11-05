import { initialState } from "./index";

export function InterestReducer(state = initialState.Interest, action) {
  var newState;
  switch (action.type) {
    case "NEW_DATA_LIST": {
      if (action.part == "Interest") {
        newState = Object.assign({}, state, {
          byId: action.data
        });
      }
      break;
    }
    case "ADD_DATA": {
      if (action.part == "Interest") {
        newState = Object.assign({}, state, {
          byId: [...state.byId, action.data]
        });
      } else {
        console.log("excuse me , wtf");
        newState = state;
      }
      break;
    }
    default: {
      newState = state;
    }
  }
  return newState;
}
