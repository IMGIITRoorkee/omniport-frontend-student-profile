import React from "react";
import { List, Segment } from "semantic-ui-react";
import { EditIcon } from "./editIcon";

import style from "../styles.css";

const CurrentEducation = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List styleName="style.list">
          <List.Item>
            <List.Content>
              <div>
                Semester {props.data.semester}
                <p styleName="style.gray">
                  SGPA: {props.data.sgpa}
                  <br />
                  CGPA: {props.data.cgpa}
                </p>
              </div>
            </List.Content>
          </List.Item>
        </List>

        <div>
          <EditIcon rearrange={props.rearrange} onClick={() => props.manageData(props.data.id)} />
        </div>
      </div>
    </Segment>
  );
};
export default CurrentEducation;
