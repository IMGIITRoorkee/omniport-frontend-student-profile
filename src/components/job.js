import React from "react";
import "./../index.css";
import { Button, Icon, List, Segment } from "semantic-ui-react";
import style from "../styles.css";

export function Job(props) {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List>
          <List.Item>
            <List.Icon name="stop" color="blue" />
            <List.Content>
              {props.data.position} - <b>{props.data.organisation}</b>
              <p>
                {props.data.startDate} to{" "}
                {props.data.endData == "" ? props.data.endDate : "present"}
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
}