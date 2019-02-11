import React from "react";
import { Button, Segment, Icon, Image, List } from "semantic-ui-react";
import style from "../styles.css";
import { isMobile } from "react-device-detect";

import { EditIcon } from "./editIcon";

export const Project = props => {
  return (
    <Segment attached styleName="style.project">
      {isMobile ? (
        <List>
          <List.Item>
            <List.Icon name="stop" color="blue" />
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

              {props.data.image ? (
                <img src={props.data.image} styleName="style.mobPicture" />
              ) : null}
            </List.Content>
          </List.Item>
        </List>
      ) : (
        <div styleName="style.textBox">
          <div styleName="style.compStyle">
            <List>
              <List.Item>
                <List.Icon name="stop" color="blue" />
                <List.Content>
                  <b>{props.data.topic}</b>

                  <br />
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
                </List.Content>
              </List.Item>
            </List>
          </div>
          {props.data.image ? (
            <div>
              <img src={props.data.image} styleName="style.compPicture" />
            </div>
          ) : null}
        </div>
      )}
      <EditIcon
        rearrange={props.rearrange}
        onClick={() => props.manageData(props.data.id)}
      />
    </Segment>
  );
};
export default Project;
