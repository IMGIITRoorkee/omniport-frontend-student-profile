import React from "react";
import "./../index.css";
import { Button, Icon, List, Segment } from "semantic-ui-react";
import style from "../stylesheets/book.css";

export function Book(props) {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <div>
          {props.data.title} by <b>{props.data.authors}</b>
          <p>
            Published by {props.data.publisher} in {props.data.year}
          </p>
          <p style={{ fontSize: "0.95rem" }}>
            {props.data.pages ? <span>Pages: {props.data.pages}</span> : null}
            {props.data.volumes ? (
              <span>Volumes: {props.data.volumes}</span>
            ) : null}
            {props.data.contributions ? (
              <span>Contributions: {props.data.contributions}</span>
            ) : null}
            {props.data.isbnCode ? (
              <span>ISBN Code: {props.data.isbnCode}</span>
            ) : null}
          </p>
        </div>
        <div>
          <Icon
            name="edit"
            color="grey"
            onClick={() => props.manageData(props.data.id)}
          />
        </div>
      </div>
    </Segment>
  );
}
