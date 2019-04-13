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
                  {props.data.title} by {props.data.authors} <br />
                  <p styleName="style.gray">
                    Published by {props.data.publisher}, {props.data.year}
                  </p>
                  {props.data.pages ? (
                    <span styleName="style.gray">
                      Pages: {props.data.pages}
                      <br />
                    </span>
                  ) : null}
                  {props.data.volumes ? (
                    <span styleName="style.gray">
                      Volumes: {props.data.volumes}
                      <br />
                    </span>
                  ) : null}
                  {props.data.journal ? (
                    <span styleName="style.gray">
                      Journal: {props.data.journal}
                      <br />
                    </span>
                  ) : null}
                  {props.data.paper ? (
                    <a href={props.data.paper} target="_blank">
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
            onClick={() => props.manageData(props.item.id, props.data, props.componentName)}
          />
        </div>
      </div>
    </Segment>
  );
};

export default Paper;
