import React from "react";
import { List, Segment } from "semantic-ui-react";
import { EditIcon } from "./editIcon";

import style from "../styles.css";

const Referee = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <div>
          <List styleName="style.list">
            <List.Item>
              <List.Content>
                {props.data.referee}
                <p styleName="style.gray">
                  {props.data.designation}, {props.data.institute}
                  <br />
                  {props.data.email}
                  <br />
                  {props.data.phone ? <span>{props.data.phone}</span> : null}
                </p>
              </List.Content>
            </List.Item>
          </List>
        </div>
        <div>
          <EditIcon rearrange={props.rearrange} onClick={() => props.manageData(props.data.id)} />
        </div>
      </div>
    </Segment>
  );
};
export default Referee;
