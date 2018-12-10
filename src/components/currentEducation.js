import React from "react";
import "./../index.css";
import { Button, Icon, List, Segment } from "semantic-ui-react";
import style from "../stylesheets/currentEducation.css";

export function CurrentEducation(props) {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <div>
          <p>Semester-{props.data.semesterNumber}</p>
          <p>SGPA: {props.data.sgpa} </p>
          <p>CGPA: {props.data.cgpa} </p>
        </div>

        <div>
          <Icon
            name="edit"
            color="grey"
            onClick={() => props.manageData(props.data.id)}
          />
        </div>
      </div>
    </Segment>
  );
}
