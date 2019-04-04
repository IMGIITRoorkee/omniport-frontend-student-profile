import axios from "axios";
import { initial } from "../constants/initial";
// import { headers } from "./../constants/requestHeaders";

function receiveInterests(responseData) {
  return {
    type: "FETCH_INTERESTS",
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

export function manageData(id, data) {
  let formData = Object.assign({}, data.find(x => x.id == id));
  for (let i in initial["interest"].links) {
    let name = initial["interest"].links[i];
    formData[name + "Link"] = formData[name];
    formData[name] = null;
  }

  return {
    type: "MANAGE_DATA",
    formData: formData,
    update: true,
    active: true
  };
}
