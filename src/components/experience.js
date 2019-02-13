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
            <List.Icon name="stop" color="blue" />
            <List.Content>
              {props.data.experienceType == "int" ? (
                <div>Internship</div>
              ) : (
                <div>Job</div>
              )}
              {props.data.position} - <b>{props.data.organisation}</b>
              <p styleName="style.gray1">
                {formatDate(props.data.startDate)} to{" "}
                {formatDate(props.data.endDate)}
                <br />
                <span>{props.data.description}</span>
              </p>
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
