import { snakeCase , upperFirst } from "lodash";
import axios from "axios";

import { receiveFetchedResults } from "./genericActions";

import { getCookie } from "formula_one";

export function handleVisibile(initialdata , componentName , url , { updateSectionVisibility } , turnVisible){

  let data = {
    model: upperFirst(componentName),
    visibility: turnVisible,
  };
  let headers = {
    "X-CSRFToken": getCookie("csrftoken")
  };
  let option = "put";
  let finaldata;

  axios({
    method: "post",
    url: "/api/student_profile/section_visibility/",
    data: data,
    headers: headers
  })
  .then(response => {
    updateSectionVisibility(response.data,componentName)
  })
  .catch(error => {
    console.log(error)
  });

}
