import React from "react";
import { List, Segment } from "semantic-ui-react";
import { EditIcon } from "./editIcon";

import style from "../styles.css";

const Book = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <div>
          <List styleName="style.list">
            <List.Item>
              <List.Icon name="stop" color="blue" />
              <List.Content>
                <div>
                  {props.data.title} by {props.data.authors} <br />
                  <p styleName="style.gray1">
                    Published by {props.data.publisher}, {props.data.year}
                  </p>
                  {props.data.contribution ? (
                    <span styleName="style.gray2">
                      Contribution: {props.data.contribution}
                      <br />
                    </span>
                  ) : null}
                  {props.data.pages ? (
                    <span styleName="style.gray2">
                      Pages: {props.data.pages}
                      <br />
                    </span>
                  ) : null}
                  {props.data.volumes ? (
                    <span styleName="style.gray2">
                      Volumes: {props.data.volumes}
                      <br />
                    </span>
                  ) : null}
                  {props.data.editors ? (
                    <span styleName="style.gray2">
                      ISBN Code: {props.data.editors}
                      <br />
                    </span>
                  ) : null}
                </div>
              </List.Content>
            </List.Item>
          </List>
        </div>
        <div>
          <EditIcon
            rearrange={props.rearrange}
            onClick={() => props.manageData(props.data.id)}
          />
        </div>
      </div>
    </Segment>
  );
};
export default Book;
