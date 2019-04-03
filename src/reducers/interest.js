const initialState = { data: [] };

const interest = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVE_INTERESTS":
      return { ...state, data: action.responseData };
    case "ADD_INTEREST":
      return { ...state, data: [...state.data, action.item] };
    case "REMOVE_INTEREST":
      return state;
    case "UPDATE_INTEREST":
      return state;
    default:
      return state;
  }
};

export default interest;
