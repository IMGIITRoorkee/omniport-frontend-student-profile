import React from "react";
import { Button, Segment, Icon, Image } from "semantic-ui-react";
import style from "../stylesheets/internship.css";
import { isMobile } from "react-device-detect";

export function Project(props) {
  return (
    <Segment attached styleName="style.project">
      <div styleName="style.textBox">
        {isMobile ? (
          <div>
            <b>{props.data.topic}</b>
            <p>{props.data.field}</p>
            <p>
              {props.data.startDate} - {props.data.endDate}
            </p>
            <p>{props.data.description}</p>
          </div>
        ) : (
          <div styleName="style.compStyle">
            <b>{props.data.topic}</b>
            <p>{props.data.field}</p>
            <p>
              {props.data.startDate} - {props.data.endDate}
            </p>
            <p>{props.data.description}</p>
          </div>
        )}

        {props.data.image ? (
          isMobile ? (
            <Image
              src={props.data.image.replace(
                "http://localhost:3003/",
                "http://192.168.121.228:60025/"
              )}
              styleName="style.mobPicture"
            />
          ) : (
            <Image
              src={props.data.image.replace(
                "http://localhost:3003/",
                "http://192.168.121.228:60025/"
              )}
              styleName="style.compPicture"
            />
          )
        ) : null}
      </div>
      <Icon
        styleName="style.icon"
        name="edit"
        color="grey"
        onClick={() => props.update(props.data)}
      />
    </Segment>
  );
}
