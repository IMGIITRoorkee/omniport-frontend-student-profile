import React from "react";
import { Icon, List, Segment } from "semantic-ui-react";
import { EditIcon } from "../editIcon";

import style from "../../styles.css";

const Interest = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List styleName="style.list">
          <List.Item>
            <List.Content>{props.item.topic}</List.Content>
          </List.Item>
        </List>

        <div>
          <EditIcon
            rearrange={props.rearrange}
            onClick={() => props.manageData(props.item.id, props.data, props.componentName)}
          />
          {props.item.verified && <Icon color="grey" name="check circle" />}
        </div>
      </div>
    </Segment>
  );
};

export default Interest;
