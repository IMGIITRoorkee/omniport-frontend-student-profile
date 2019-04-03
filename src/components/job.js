import React from "react";
import { List, Segment } from "semantic-ui-react";
import { EditIcon } from "./editIcon";

import style from "../styles.css";

export function Job(props) {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List styleName="style.list">
          <List.Item>
            <List.Content>
              {props.data.position} - <b>{props.data.organisation}</b>
              <p>
                {props.data.startDate} to {props.data.endData == "" ? props.data.endDate : "present"}
              </p>
              <p>{props.data.description}</p>
            </List.Content>
          </List.Item>
        </List>

        <div>
          <EditIcon rearrange={props.rearrange} onClick={() => props.manageData(props.data.id)} />
        </div>
      </div>
    </Segment>
  );
}
