import React from "react";
import "./../index.css";
import { Button, Icon, List, Segment } from "semantic-ui-react";
import style from "../stylesheets/interest.css";

export function Interest(props) {
  return (
    <Segment basic styleName="style.field">
      <div styleName="style.info-heading">
        <div>
          <Icon name="stop" size="small" color="blue" />
          {props.data.topic}
        </div>
        <Icon
          name="edit"
          color="grey"
          onClick={() => props.manageData(props.data.id)}
        />
        {/* <Icon
          color="grey"
          name="compose"
          onClick={() => props.manageData(props.data.id)}
        /> */}
      </div>
    </Segment>
  );
}
