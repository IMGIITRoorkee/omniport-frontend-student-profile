import React from "react";
import { Button, Icon, List, Segment } from "semantic-ui-react";
import style from "../stylesheets/interest.css";

export function Interest(props) {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List>
          <List.Item>
            <List.Icon name="stop" color="blue" />
            <List.Content>{props.data.topic}</List.Content>
          </List.Item>
        </List>

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
