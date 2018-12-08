import React from "react";
import { Button, Icon, List, Segment } from "semantic-ui-react";
import style from "../stylesheets/interest.css";

export function Interest(props) {
  return (
    <Segment attached>
      <div styleName="style.flex-box">
        <div>
          <Icon name="stop" size="small" color="blue" />
          {props.data.topic}
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
