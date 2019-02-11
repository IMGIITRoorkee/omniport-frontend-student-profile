import React from "react";
import { Button, Icon, List, Segment } from "semantic-ui-react";
import { EditIcon } from "./editIcon";

import style from "../styles.css";

const Interest = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List>
          <List.Item>
            <List.Icon name="stop" color="blue" />
            <List.Content>{props.data.topic}</List.Content>
          </List.Item>
        </List>

        <EditIcon
          rearrange={props.rearrange}
          onClick={() => props.manageData(props.data.id)}
        />
      </div>
    </Segment>
  );
};

export default Interest;
