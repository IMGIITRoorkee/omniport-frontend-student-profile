import React from "react";
import "./../index.css";
import { Button, Icon, List, Segment } from "semantic-ui-react";
import style from "../styles.css";

export function Referee(props) {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List>
          <List.Item>
            <List.Icon name="stop" color="blue" />
            <List.Content>
              {props.data.referee}
              <p>
                {props.data.designation}, {props.data.institute}
              </p>
              <p>{props.data.email}</p>
            </List.Content>
          </List.Item>
        </List>

        {!props.rearrange ? (
          <Icon
            name="edit"
            color="grey"
            onClick={() => props.manageData(props.data.id)}
          />
        ) : null}
      </div>
    </Segment>
  );
}
