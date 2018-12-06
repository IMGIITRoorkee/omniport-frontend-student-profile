import React from "react";
import { Button, Icon, List, Segment } from "semantic-ui-react";
import style from "../stylesheets/achievement.css";

export function Achievement(props) {
  return (
    <Segment basic>
      <div styleName="style.flex-box">
        <div>
          <Icon name="stop" size="small" color="blue" />
          {props.data.achievement}
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
