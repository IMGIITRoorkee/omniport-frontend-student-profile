import React from "react";
import "./../index.css";
import { Button, Icon, List, Segment } from "semantic-ui-react";
import style from "../stylesheets/previousEducation.css";

export function PreviousEducation(props) {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <Segment basic>
          {/* {JSON.stringify(props.data)} */}
          {props.data.degree} - {props.data.graduation} in {props.data.subject}
          <p>
            {props.data.institute}-{props.data.year}
          </p>
          <p>CGPA: {props.data.cgpa}</p>
        </Segment>

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
