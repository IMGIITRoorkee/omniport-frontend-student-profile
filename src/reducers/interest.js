import { initial } from "./../constants/initial";

const initialState = { update: false, active: false, formData: initial["interest"].data, data: [], empty: "" };

const interest = (state = initialState, action) => {
  switch (action.type) {
    //adding the response of first GET request to the state to get the initial list of items
    case "FETCH_INTERESTS":
      return { ...state, data: action.responseData };

    case "MANAGE_DATA":
      return { ...state, formData: action.formData, update: action.update, active: action.active };

    case "APPEND_DATA":
      return { ...state, data: action.newData };
    case "HANDLE_SHOW":
      return { ...state, active: action.active, formData: action.formData, update: action.update };
    case "REMOVE_INTEREST":
      return state;

    case "UPDATE_INTEREST":
      return state;

    default:
      return state;
  }
};

export default interest;
