import { getCookie } from "formula_one";

export const headers = {
  "X-CSRFToken": getCookie("csrftoken"),
  "Content-type": "multipart/form-data"
};
