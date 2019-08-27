import React from "react";
import { Icon, List, Segment } from "semantic-ui-react";
import { EditIcon } from "../editIcon";
import { formatDate } from "../../utils/formatDate";

import style from "../../styles.css";

const Position = props => {
  const {startDate, endDate, isFullDate} = props.item;
  const date = formatDate(startDate, endDate, isFullDate); 
  let duration = date.startDate;
  if(date.startDate != date.endDate) duration += " to " + date.endDate;
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List.Item>
          {/*  */}
          <List.Content>
            {props.item.position}, <b>{props.item.organisation}</b>
            <br />
            <span styleName="style.gray">
              {duration}
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
