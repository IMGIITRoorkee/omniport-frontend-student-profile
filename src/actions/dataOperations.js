import axios from "axios";
import { getCookie } from "formula_one";
const dict = {
  Interest: "interest"
};

export function getDataList(part) {
  return function(dispatch) {
    axios
      .get("/api/student_profile/" + dict[part] + "/")
      .then(function(response) {
        dispatch(newDataList(response.data, "Interest"));
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}
export function newDataList(data, part) {
  return {
    type: "NEW_DATA_LIST",
    data: data,
    part: part
  };
}

export function addData(data, part) {
  return {
    type: "ADD_DATA",
    data,
    part
  };
}
export function modifyData(data, part, del) {
  return {
    type: "MODIFY_DATA",
    part,
    data,
    del
  };
}
export function updateData(part, data, del) {
  let headers = {
    "X-CSRFToken": getCookie("csrftoken")
  };
  var opt = "put";
  if (del == true) {
    opt = "delete";
  }
  return function(dispatch) {
    const url = "/api/student_profile/" + dict[part] + "/" + data.id + "/";
    axios({
      method: opt,
      url: url,
      data: data,
      headers: headers
    }).then(function(response) {
      dispatch(modifyData(data, dict[part], del));
    });
  };
}
export function postData(part, data) {
  let headers = {
    "X-CSRFToken": getCookie("csrftoken")
  };
  return function(dispatch) {
    axios({
      method: "post",
      url: "/api/student_profile/" + dict[part] + "/",
      data: data,
      headers: headers
    }).then(function(response) {
      console.log(response);
      dispatch(addData(response.data, part));
    });
  };
}
