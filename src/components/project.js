import React from "react";
import { Button, Segment, Icon, Image, List } from "semantic-ui-react";
import style from "../stylesheets/internship.css";
import { isMobile } from "react-device-detect";

export function Project(props) {
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
                </div>
              </div>

              {props.data.image ? (
                <img
                  src={props.data.image.replace(
                    "http://localhost:3003/",
                    "http://192.168.121.228:60025/"
                  )}
                  styleName="style.mobPicture"
                />
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
                </List.Content>
              </List.Item>
            </List>
          </div>
          {props.data.image ? (
            <div>
              <img
                src={props.data.image.replace(
                  "http://localhost:3003/",
                  "http://192.168.121.228:60025/"
                )}
                styleName="style.compPicture"
              />
            </div>
          ) : null}
        </div>
      )}

      <Icon
        styleName="style.icon"
        name="edit"
        color="grey"
        onClick={() => props.update(props.data)}
      />
    </Segment>
  );
}
