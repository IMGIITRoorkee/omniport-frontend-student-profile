export const appDetailsReducer = (state = { editMode: false, loading: true, theme: null }, action) => {
  switch (action.type) {
    case "SET_APP_DETAILS":
      return {
        editMode: action.editMode,
        theme: action.theme,
        handleParam: action.handleParam,
        loading: action.loading
      };

    default:
      return state;
  }
};
