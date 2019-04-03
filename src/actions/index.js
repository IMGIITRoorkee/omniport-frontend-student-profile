import axios from "axios";
// import { headers } from "./../constants/requestHeaders";

function receiveInterests(responseData) {
  return {
    type: "RECEIVE_INTERESTS",
    responseData: responseData
  };
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchInterests() {
  return function(dispatch) {
    axios
      .get("/api/student_profile/" + "interest" + "/")
      .then(response => {
        dispatch(receiveInterests(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}
