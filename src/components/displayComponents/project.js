import React from "react";
import { Modal, Segment, Icon, Image, List } from "semantic-ui-react";
import style from "../../styles.css";
import { isMobile } from "react-device-detect";
import { formatDate } from "../../utils/formatDate";

import { EditIcon } from "../editIcon";
//css for mobile version is left
export const Project = props => {
  return (
    <Segment attached styleName="style.project">
      {isMobile ? (
        <List>
          <List.Item>
            <List.Content>
              <div styleName="style.textBox">
                <b>{props.data.topic}</b>
                <div>
                  <p>{props.data.field}</p>
                  <p>
                    {props.data.startDate}
                    {props.endDate != "" ? " to " + props.data.endDate : null}
                  </p>
                  <p>{props.data.description}</p>
                  {props.data.image ? (
                    <a href={props.data.image} target="_blank">
                      Image
                    </a>
                  ) : null}
                </div>
              </div>

              {props.data.image ? <Image src={props.data.image} styleName="style.mobPicture" /> : null}
            </List.Content>
          </List.Item>
        </List>
      ) : (
        <div styleName="style.textBox">
          <div styleName="style.compStyle">
            <List>
              <List.Item>
                <List.Content>
                  {props.data.topic} in {props.data.field}
                  <div styleName="style.gray">
                    {formatDate(props.data.startDate)} to {formatDate(props.data.endDate)}
                  </div>
                  <p styleName="style.gray style.description"> {props.data.description}</p>
                </List.Content>
              </List.Item>
            </List>
          </div>
          {props.data.image ? (
            <div>
              <Modal basic trigger={<Image src={props.data.image} styleName="style.compPicture" />} basic fluid>
                <Modal.Content image>
                  <Image src={props.data.image} styleName="style.compPicture" wrapped size={"massive"} />
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
