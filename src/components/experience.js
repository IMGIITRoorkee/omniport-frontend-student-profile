import React from "react";
import { List, Segment } from "semantic-ui-react";
import { EditIcon } from "./editIcon";
import { formatDate } from "./../utils";

import style from "../styles.css";

const Experience = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List styleName="style.list">
          <List.Item>
            <List.Content>
              <div>{props.data.experienceType == "int" ? "Internship" : "Job"}</div>
              <div>
                {props.data.position} at <b>{props.data.organisation}</b>
              </div>
              <div styleName="style.gray">
                {formatDate(props.data.startDate)} to {formatDate(props.data.endDate)}
              </div>
              <p styleName="style.gray style.description">{props.data.description}</p>
            </List.Content>
          </List.Item>
        </List>

        <div>
          <EditIcon rearrange={props.rearrange} onClick={() => props.manageData(props.data.id)} />
        </div>
      </div>
    </Segment>
  );
};
export default Experience;
