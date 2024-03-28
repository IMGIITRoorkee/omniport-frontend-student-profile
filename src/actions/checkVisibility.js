// package imports
import { snakeCase } from "lodash";
import axios from "axios";

// local imports
import { headers } from "../constants/formPostRequestHeaders";
import { specs } from "../constants/specs";

export function handleVisibile(initialdata , componentName , url , { updateDeleteData } , turnVisible){

  console.log(specs[componentName])
  let error_array = [];
  let option = "put"
  for(let i =0 ; i< initialdata.length;i++){
    console.log(turnVisible)
    if(turnVisible == false){
      initialdata[i].visibility = false
    }
    if(turnVisible == true){
      initialdata[i].visibility = true
    }
    console.log(initialdata[i])
    let data = new FormData();
    let info = initialdata[i];
    for (let prop in info) {
      let link = prop + "Link"
      if (info.hasOwnProperty(link) === false) {
        let val = info[prop];
        if(info[prop] == null) val = "";
        data.append(snakeCase(prop), val);
      } else {
        if (info[link] != null && info[prop] != null) {
          data.append(snakeCase(prop), info[prop]);
        } else if (
          info[prop] == null &&
          info[link] != null
        ) {
        } else if (
          info[prop] == null &&
          info[link] == null
        ) {
          data.append(snakeCase(prop), "");
        }
      }
    }
    
    axios({
      method: option,
      url: "/api/student_profile/" + url + "/" + initialdata[i].id + "/",
      data: data,
      headers: headers
    })
      .then(response => {
        let data = response.data;
        updateDeleteData(
          data,
          option,
          initialdata,
          componentName
        );
      })
      .catch(error => {
        error_array.push("Unable to update " + initialdata[i].id + "due to " + error)
      });
  }

  if(error_array.length == 0){
    alert("success")
  }
  else{
    for(let j in error_array){
      console.log(error_array)
    }
    alert("error")
  }
  
}
