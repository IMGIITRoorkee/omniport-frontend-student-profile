import axios from "axios";

export const fetchAppDetails = handleParam => {
  return function(dispatch) {
    let theme;
    let editMode;
    if (handleParam == undefined) {
      editMode = true;
    } else {
      editMode = false;
    }
    if (editMode) {
      axios
        .get("/api/student_profile/profile/")
        .then(response => {
          theme = response.data[0].theme;
          dispatch(setAppDetails(editMode, theme, handleParam));
        })
        .catch(error => {
          console.log(error);
          if (error.response.status == 401) {
            document.location = "/auth/login?next=/student_profile";
          }
        });
    } else {
      axios
        .get("/api/student_profile/profile/" + handleParam + "/handle/")
        .then(response => {
          theme = response.data.theme;
          dispatch(setAppDetails(editMode, theme, handleParam));
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

export const setAppDetails = (editMode, theme, handleParam) => {
  return {
    type: "SET_APP_DETAILS",
    editMode: editMode,
    theme: theme,
    handleParam: handleParam,
    loading: false
  };
};
