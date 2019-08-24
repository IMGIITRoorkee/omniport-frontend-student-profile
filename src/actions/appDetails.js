import axios from "axios";

//Tip: In general action generator returns object but this function thing is possible because of redux thunk.
export const fetchAppDetails = handle => {
  return function(dispatch) {
    let theme;
    let editMode = (!handle) ? true : false;
    if (editMode) {
      axios
        .get("/api/student_profile/profile/")
        .then(response => {
          theme = response.data[0].theme;
          dispatch(setAppDetails(editMode, theme, handle));
        })
        .catch(error => {
          console.log(error);
          if (error.response.status == 401) {
            document.location = "/auth/login?next=/student_profile";
          }
        });
    } else {
      axios
        .get("/api/student_profile/profile/" + handle + "/handle/")
        .then(response => {
          theme = response.data.theme;
          dispatch(setAppDetails(editMode, theme, handle));
        })
        .catch(error => {
          console.log(error);
          if (error.response.status == 404) {
            document.location = "/404";
          }
        });
    }
  };
};

export const setAppDetails = (editMode, theme, handle) => {
  return {
    type: "SET_APP_DETAILS",
    editMode: editMode,
    theme: theme,
    handle: handle,
    loading: false
  };
};

export const setTheme = theme => {
  return {
    type: "SET_THEME",
    theme: theme
  };
};
