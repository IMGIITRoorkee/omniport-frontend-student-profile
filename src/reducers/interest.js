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

    case "UPDATE_DELETE_DATA":
      return { ...state, data: action.newData };

    case "HANDLE_SHOW":
      return { ...state, active: action.active, formData: action.formData, update: action.update };

    case "HANDLE_HIDE":
      return { ...state, active: action.active, update: action.update };

    case "HANDLE_DRAG_SHOW":
      return { ...state, rearrange: action.rearrange };

    case "HANDLE_DRAG_HIDE":
      return { ...state, rearrange: action.rearrange };

    case "HANDLE_UPDATE":
      return { ...state, data: action.newData, rearrange: action.rearrange };

    default:
      return state;
  }
};

export default interest;
