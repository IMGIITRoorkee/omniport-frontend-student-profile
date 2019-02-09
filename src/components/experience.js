import React from "react";
import "./../index.css";
import { Button, Icon, List, Segment } from "semantic-ui-react";
import style from "../styles.css";

const Experience = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List>
          <List.Item>
            {props.experienceType == "int" ? <p>Internship</p> : <p>Job</p>}
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
          {!props.rearrange ? (
            <Icon
              name="edit"
              color="grey"
              onClick={() => props.manageData(props.data.id)}
            />
          ) : null}
        </div>
      </div>
    </Segment>
  );
};
export default Experience;