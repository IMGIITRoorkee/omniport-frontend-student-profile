import React from "react";
import { List, Segment } from "semantic-ui-react";
import { EditIcon } from "./editIcon";

import style from "../styles.css";

const Referee = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <div>
          <List>
            <List.Item>
              <List.Icon name="stop" color="blue" />
              <List.Content>
                {props.data.referee}
                <p>
                  {props.data.designation}, {props.data.institute}
                </p>
                <p>{props.data.email}</p>
                {props.data.phone ? <p>{props.data.phone}</p> : null}
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
export default Referee;
