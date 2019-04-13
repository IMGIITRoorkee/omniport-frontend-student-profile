export const genericReducerMaker = componentName => {
  const initialState = { update: false, active: false, data: [] };

  const genericReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
      //adding the response of first GET request to the state to get the initial list of items
      case "FETCH_DATA" + "--" + componentName:
        return { ...state, data: action.responseData, isEmpty: action.isEmpty };

      case "MANAGE_DATA" + "--" + componentName:
        return { ...state, formData: action.formData, update: action.update, active: action.active };

      case "APPEND_DATA" + "--" + componentName:
        return { ...state, data: action.newData };

      case "UPDATE_DELETE_DATA" + "--" + componentName:
        return { ...state, data: action.newData };

      case "HANDLE_SHOW" + "--" + componentName:
        return { ...state, active: action.active, formData: action.formData, update: action.update };

      case "HANDLE_HIDE" + "--" + componentName:
        return { ...state, active: action.active, update: action.update };

      case "HANDLE_DRAG_SHOW" + "--" + componentName:
        return { ...state, rearrange: action.rearrange };

      case "HANDLE_DRAG_HIDE" + "--" + componentName:
        return { ...state, rearrange: action.rearrange };

      case "HANDLE_UPDATE" + "--" + componentName:
        return { ...state, data: action.newData, rearrange: action.rearrange };

      default:
        return state;
    }
  };
  return genericReducer;
};
