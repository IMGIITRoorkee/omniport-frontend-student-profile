import React from "react";
import { Button, Segment, Icon, Grid } from "semantic-ui-react";
import style from "../stylesheets/internship.css";

export function Project(props) {
  var w1, w2, w3;
  if (props.image) {
    w1 = 10;
    w3 = 1;
  } else {
    w1 = 15;
    w3 = 1;
  }
  return (
    <Grid stackable>
      <Grid.Column width={w1}>
        <Segment basic>
          <b>{props.data.topic}</b>
          <p>{props.data.field}</p>
          <p>
            {props.data.startDate} - {props.data.endDate}
          </p>
          <p>{props.data.description}</p>
        </Segment>
      </Grid.Column>
      {props.data.image ? (
        <Grid.Column width={5} textAlign="right">
          <img
            src={props.data.image.replace(
              "http://localhost:3003/",
              "http://192.168.121.228:60025/"
            )}
            styleName="style.picture"
          />
        </Grid.Column>
      ) : null}

      <Grid.Column width={w3}>
        <Icon
          name="edit"
          color="grey"
          onClick={() => props.update(props.data)}
        />
      </Grid.Column>
    </Grid>
  );
}
