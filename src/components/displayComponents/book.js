import React from "react";
import { List, Segment } from "semantic-ui-react";
import { EditIcon } from "../editIcon";

import style from "../../styles.css";

const Book = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <div>
          <List styleName="style.list">
            <List.Item>
              <List.Content>
                <div>
                  {props.data.title} by {props.data.authors} <br />
                  <p styleName="style.gray ">
                    Published by {props.data.publisher}, {props.data.year}
                  </p>
                  {props.data.contribution ? (
                    <div styleName="style.gray">Contribution: {props.data.contribution}</div>
                  ) : null}
                  {props.data.pages ? <div styleName="style.gray">Pages: {props.data.pages}</div> : null}
                  {props.data.volumes ? <div styleName="style.gray">Volumes: {props.data.volumes}</div> : null}
                  {props.data.editors ? <div styleName="style.gray">ISBN Code: {props.data.editors}</div> : null}
                </div>
              </List.Content>
            </List.Item>
          </List>
        </div>
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
export default Book;
