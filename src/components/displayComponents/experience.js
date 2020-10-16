import React from "react";
import { Icon, List, Segment } from "semantic-ui-react";
import { EditIcon } from "../editIcon";
import { formatDate } from "../../utils/formatDate";

import style from "../../styles.css";

const Experience = props => {
  const {startDate, endDate, isFullDate} = props.item;
  const date = formatDate(startDate, endDate, isFullDate); 
  let duration = date.startDate;
  if(date.startDate != date.endDate) duration += " to " + date.endDate;
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List styleName="style.list">
          <List.Item>
            <List.Content>
              <div>{props.item.experienceType == "int" ? "Internship" : "Job"}</div>
              <div>
                {props.item.position} at <b>{props.item.organisation}</b>
              </div>
              <div styleName="style.gray">
              {duration}
              </div>
              <p styleName="style.gray style.description">{props.item.description}</p>
            </List.Content>
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
export default Experience;
