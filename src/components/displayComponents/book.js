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
                  {props.item.title} by {props.item.authors} <br />
                  <p styleName="style.gray ">
                    Published by {props.item.publisher}, {props.item.year}
                  </p>
                  {props.item.contribution ? (
                    <div styleName="style.gray">Contribution: {props.item.contribution}</div>
                  ) : null}
                  {props.item.pages ? <div styleName="style.gray">Pages: {props.item.pages}</div> : null}
                  {props.item.volumes ? <div styleName="style.gray">Volumes: {props.item.volumes}</div> : null}
                  {props.item.editors ? <div styleName="style.gray">ISBN Code: {props.item.editors}</div> : null}
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
