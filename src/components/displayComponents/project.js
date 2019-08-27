import React from "react";
import { Modal, Segment, Icon, Image, List } from "semantic-ui-react";
import style from "../../styles.css";
import { isMobile } from "react-device-detect";
import { formatDate } from "../../utils/formatDate";

import { EditIcon } from "../editIcon";
//css for mobile version is left
export const Project = props => {
  const {startDate, endDate, isFullDate} = props.item;
  const date = formatDate(startDate, endDate, isFullDate); 
  let duration = date.startDate;
  if(date.startDate != date.endDate) duration += " to " + date.endDate;
  return (
    <Segment attached styleName="style.project">
      {isMobile ? (
        <List>
          <List.Item>
            <List.Content>
              <div styleName="style.textBox">
                <b>{props.item.topic}</b>
                <div>
                  <p>{props.item.field}</p>
                  <p>
                    {props.item.startDate}
                    {props.endDate != "" ? " to " + props.item.endDate : null}
                  </p>
                  <p>{props.item.description}</p>
                  {props.item.image ? (
                    <a href={props.item.image} target="_blank">
                      Image
                    </a>
                  ) : null}
                </div>
              </div>

              {props.item.image ? <Image src={props.item.image} styleName="style.mobPicture" /> : null}
            </List.Content>
          </List.Item>
        </List>
      ) : (
        <div styleName="style.textBox">
          <div styleName="style.compStyle">
            <List>
              <List.Item>
                <List.Content>
                  {props.item.topic} in {props.item.field}
                  <div styleName="style.gray">
                    {duration}
                  </div>
                  <p styleName="style.gray style.description"> {props.item.description}</p>
                </List.Content>
              </List.Item>
            </List>
          </div>
          {props.item.image ? (
            <div>
              <Modal basic trigger={<Image src={props.item.image} styleName="style.compPicture" />} basic fluid>
                <Modal.Content image>
                  <Image src={props.item.image} styleName="style.compPicture" wrapped size={"massive"} />
                </Modal.Content>
              </Modal>
            </div>
          ) : null}
        </div>
      )}
      <EditIcon
        rearrange={props.rearrange}
        onClick={() => props.manageData(props.item.id, props.data, props.componentName)}
      />
    </Segment>
  );
};
export default Project;
