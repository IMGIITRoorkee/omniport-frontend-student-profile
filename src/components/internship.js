import React from "react";
import "./../index.css";
import { Button, Icon, List, Segment } from "semantic-ui-react";
import style from "../stylesheets/internship.css";

export function Internship(props) {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <Segment basic styleName="style.content">
          {props.data.position} - <b>{props.data.organisation}</b>
          <p>
            {props.data.startDate} - {props.data.endDate}
          </p>
          <p>{props.data.description}</p>
        </Segment>
        <div styleName="style.edit-icon">
          <Icon
            name="edit"
            color="grey"
            onClick={() => props.manageData(props.data.id)}
          />
        </div>
      </div>
      {/* <div styleName="style.flex-box">
        <div styleName="style.list-icon">
          <Icon name="stop circle outline" color="blue" />
        </div>

        <div styleName="style.content">{props.data.position}</div>

        <div styleName="style.edit-icon">
          <Icon
            name="compose"
            color="grey"
            onClick={() => props.manageData(props.data.id)}
          />
        </div>
      </div> */}
    </Segment>
  );
}
