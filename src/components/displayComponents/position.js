import React from "react";
import { Icon, List, Segment } from "semantic-ui-react";
import { EditIcon } from "../editIcon";
import { formatDate } from "../../utils/formatDate";

import style from "../../styles.css";

const Position = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List.Item>
          {/*  */}
          <List.Content>
            {props.item.position}, <b>{props.item.organisation}</b>
            <br />
            <span styleName="style.gray">
              {formatDate(props.item.startDate)} to {formatDate(props.item.endDate)}
            </span>
            <p styleName="style.gray style.description">{props.item.description}</p>
          </List.Content>
        </List.Item>

        <div>
          <EditIcon
            rearrange={props.rearrange}
            onClick={() => props.manageData(props.item.id, props.data, props.componentName)}
          />
        </div>
      </div>
    </Segment>
  );
};
export default Position;
