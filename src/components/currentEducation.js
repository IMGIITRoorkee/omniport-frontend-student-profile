import React from "react";
import { Icon, List, Segment } from "semantic-ui-react";
import { EditIcon } from "./editIcon";

import style from "../styles.css";

const CurrentEducation = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List>
          <List.Item>
            <List.Icon name="stop" color="blue" />
            <List.Content>
              <p>Semester - {props.data.semester}</p>
              <p>SGPA: {props.data.sgpa} </p>
              <p>CGPA: {props.data.cgpa} </p>
            </List.Content>
          </List.Item>
        </List>

        <div>
          <EditIcon
            rearrange={props.rearrange}
            onClick={() => props.manageData(props.data.id)}
          />
        </div>
      </div>
    </Segment>
  );
};
export default CurrentEducation;
