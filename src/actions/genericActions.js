import axios from "axios";
import { initial } from "../constants/initial";
import { specs } from "../constants/specs";

function receiveFetchedResults(responseData, componentName) {
  let isEmpty = (responseData.length) ? true : false;
  return {
    type: "FETCH_DATA" + "--" + componentName,
    responseData: responseData,
    isEmpty: isEmpty,
    loading: false
  };
}

export function fetchData(componentName, editMode, handle) {
  return function(dispatch) {
    let url = "/api/student_profile/" + specs[componentName]["url"] + "/";
    if (!editMode) url += handle + "/handle/";
    axios
      .get(url)
      .then(response => {
        dispatch(receiveFetchedResults(response.data, componentName));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function manageData(id, data, componentName) {
  let formData = Object.assign({}, data.find(x => x.id == id));
  for (let i in initial[componentName].links) {
    let name = initial[componentName].links[i];
    formData[name + "Link"] = formData[name];
    formData[name] = null;
  }

  return {
    type: "MANAGE_DATA" + "--" + componentName,
    formData: formData,
    update: true,
    active: true
  };
}

export function appendData(item, data, componentName) {
  let sortBy = initial[componentName].sortBy;
  let ascending = initial[componentName].ascending;

  let n = data.length;
  let i = 0;
  let flag = false;
  for (i = 0; i < n; i++) {
    if (
      ascending
        ? data[i][sortBy] >= item[sortBy]
        : data[i][sortBy] <= item[sortBy]
    ) {
      data.splice(i, 0, item);
      return {
        type: "APPEND_DATA" + "--" + componentName,
        newData: data
      };
    }
  }
  if (flag == false) {
    data.splice(i, n, item);
    return {
      type: "APPEND_DATA" + "--" + componentName,
      newData: data
    };
  }
}

export function updateDeleteData(item, option, data, componentName) {
  const data_array = data;
  if (option == "delete") {
    let newData = data_array.filter(obj => (obj.id != item.id ? true : false));
    return {
      type: "UPDATE_DELETE_DATA" + "--" + componentName,
      newData: newData
    };
  } else if (option == "put") {
    const newData = data_array.map(obj => (obj.id == item.id ? item : obj));
    newData.sort(function compare(a, b, sortBy, ascending) {
      if (ascending == true) {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      } else {
        if (a[sortBy] > b[sortBy]) return -1;
        if (a[sortBy] < b[sortBy]) return 1;
        return 0;
      }
    });
    return {
      type: "UPDATE_DELETE_DATA" + "--" + componentName,
      newData: newData
    };
  }
}

export function handleShow(componentName) {
  return {
    type: "HANDLE_SHOW" + "--" + componentName,
    active: true,
    formData: initial[componentName],
    update: false
  };
}

export function handleHide(componentName) {
  return {
    type: "HANDLE_HIDE" + "--" + componentName,
    active: false,
    update: false
  };
}

export function handleDragShow(componentName) {
  return {
    type: "HANDLE_DRAG_SHOW" + "--" + componentName,
    rearrange: true
  };
}

export function handleDragHide(componentName) {
  return {
    type: "HANDLE_DRAG_HIDE" + "--" + componentName,
    rearrange: false
  };
}

// used by drag and drop component
export function handleUpdate(data, componentName) {
  return {
    type: "HANDLE_UPDATE" + "--" + componentName,
    newData: data,
    rearrange: false
  };
}
