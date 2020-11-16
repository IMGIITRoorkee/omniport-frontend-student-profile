import React from "react";
import { Icon, List, Segment } from "semantic-ui-react";
import { EditIcon } from "../editIcon";

import style from "../../styles.css";

const Paper = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <div>
          <List styleName="style.list">
            <List.Item>
              <List.Content>
                <div>
                  {props.item.title} by {props.item.authors} <br />
                  <p styleName="style.gray">
                    Published by {props.item.publisher} in {props.item.year}
                  </p>
                  {props.item.pages ? (
                    <span styleName="style.gray">
                      Pages: {props.item.pages}
                      <br />
                    </span>
                  ) : null}
                  {props.item.volumes ? (
                    <span styleName="style.gray">
                      Volumes: {props.item.volumes}
                      <br />
                    </span>
                  ) : null}
                  {props.item.journal ? (
                    <span styleName="style.gray">
                      Journal: {props.item.journal}
                      <br />
                    </span>
                  ) : null}
                  {props.item.paper ? (
                    <a href={props.item.paper} target="_blank">
                      Source Papers
                    </a>
                  ) : null}
                </div>
              </List.Content>
            </List.Item>
          </List>
        </div>
        <div>
          <EditIcon
            rearrange={props.rearrange}
            onClick={() =>
              props.manageData(props.item.id, props.data, props.componentName)
            }
          />
          {props.item.verified && <Icon color="grey" name="check circle" />}
        </div>
      </div>
    </Segment>
  );
};

export default Paper;
