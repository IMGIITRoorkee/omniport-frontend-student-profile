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

export function appendData(item, data) {
  let sortBy = initial["interest"].sortBy;
  let ascending = initial["interest"].ascending;

  let n = data.length;
  let i = 0;
  let flag = false;
  for (i = 0; i < n; i++) {
    if (ascending ? data[i][sortBy] >= item[sortBy] : data[i][sortBy] <= item[sortBy]) {
      data.splice(i, 0, item);
      return {
        type: "APPEND_DATA",
        newData: data
      };
    }
  }
  if (flag == false) {
    data.splice(i, n, item);
    return {
      type: "APPEND_DATA",
      newData: data
    };
  }
}

export function handleShow() {
  return {
    type: "HANDLE_SHOW",
    active: true,
    formData: initial["interest"],
    update: false
  };
}
