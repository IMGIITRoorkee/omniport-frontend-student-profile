import axios from "axios";
import {toast} from 'react-semantic-toasts';

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
          // console.error(error);
          if (error.response.status == 401) {
            document.location = "/auth/login?next=/student_profile";
          }
          else {
            toast({
              type: 'error',
              title: 'Error',
              icon: 'delete',
              description: <p>Some error has occurred. Try refreshing the page</p>,
              time: 2000
            });
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
          // console.error(error);
          if (error.response.status == 404) {
            document.location = "/404";
          }
          else {
            toast({
              type: 'error',
              title: 'Error',
              icon: 'delete',
              description: <p>Some error has occurred. Try refreshing the page</p>,
              time: 2000
            });
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
