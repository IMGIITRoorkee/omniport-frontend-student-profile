import React from "react";
import "./../index.css";
import { Button, Icon, List, Segment } from "semantic-ui-react";
import style from "../styles.css";

export function CurrentEducation(props) {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List>
          <List.Item>
            <List.Icon name="stop" color="blue" />
            <List.Content>
              <p>Semester-{props.data.semesterNumber}</p>
              <p>SGPA: {props.data.sgpa} </p>
              <p>CGPA: {props.data.cgpa} </p>
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
}
