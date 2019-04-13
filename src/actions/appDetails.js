import axios from "axios";

const checkDetails = handleParam => {
  let editMode, theme;
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
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    axios
      .get("/api/student_profile/profile/" + handle + "/handle/")
      .then(response => {
        this.setState({ erroneous: "no", theme: response.data.theme });
      })
      .catch(error => {
        console.log(error);
        if (error.response.status == 404) {
          this.setState({ erroneous: "yes" });
        }
      });
  }
};
