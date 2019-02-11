import React from "react";
import { Icon, List, Segment } from "semantic-ui-react";
import { EditIcon } from "./editIcon";

import style from "../styles.css";

const Experience = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List>
          <List.Item>
            {props.data.experienceType == "int" ? (
              <p>Internship</p>
            ) : (
              <p>Job</p>
            )}
            <List.Icon name="stop" color="blue" />
            <List.Content>
              {props.data.position} - <b>{props.data.organisation}</b>
              <p>
                {props.data.startDate} to{" "}
                {props.data.endDate == null ? "present" : props.data.endDate}
              </p>
              <p>{props.data.description}</p>
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
export default Experience;
