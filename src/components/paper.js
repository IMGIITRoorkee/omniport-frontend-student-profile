import React from "react";
import { Icon, List, Segment } from "semantic-ui-react";
import { EditIcon } from "./editIcon";

import style from "../styles.css";

const Paper = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <div>
          <List>
            <List.Item>
              <List.Icon name="stop" color="blue" />
              <List.Content>
                <div>
                  <p>
                    <b>"{props.data.title}"</b> by <b>{props.data.authors}</b>
                  </p>
                  <p>Publisher : {props.data.publisher}</p>
                  <p>Year : {props.data.year}</p>
                  {props.data.pages ? <p>Pages : {props.data.pages}</p> : null}
                  {props.data.volumes ? (
                    <p>Volumes : {props.data.volumes}</p>
                  ) : null}
                  {props.data.journal ? (
                    <p>journal : {props.data.journal}</p>
                  ) : null}
                  <a href={props.data.paper} target="_blank">
                    File
                  </a>
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

export default Paper;
