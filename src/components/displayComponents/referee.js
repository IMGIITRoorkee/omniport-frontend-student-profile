import React from "react";
import { Icon, List, Segment } from "semantic-ui-react";
import { EditIcon } from "../editIcon";

import style from "../../styles.css";

const Referee = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <div>
          <List styleName="style.list">
            <List.Item>
              <List.Content>
                {props.item.referee}
                <p styleName="style.gray">
                  {props.item.designation}, {props.item.institute}
                  <br />
                  {props.item.email}
                  <br />
                  {props.item.phone ? <span>{props.item.phone}</span> : null}
                </p>
              </List.Content>
            </List.Item>
          </List>
        </div>
        <div>
          <EditIcon
            rearrange={props.rearrange}
            onClick={() => props.manageData(props.item.id, props.data, props.componentName)}
          />
          {props.item.verified && <Icon color="grey" name="check circle" />}
        </div>
      </div>
    </Segment>
  );
};
export default Referee;
