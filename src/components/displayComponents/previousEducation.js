import React from "react";
import { List, Segment } from "semantic-ui-react";
import { EditIcon } from "../editIcon";
import { graduationOptions } from "../../constants/graduationOptions";

import style from "../../styles.css";

const PreviousEducation = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List.Item>
          {/*  */}
          <List.Content>
            <div>
              {props.item.degree} - {graduationOptions[props.item.graduation]} in {props.item.field}
              <p styleName="style.gray">
                {props.item.institute + ", "}
                {props.item.year}
                <br />
                CGPA {props.item.cgpa}
              </p>
            </div>
          </List.Content>
        </List.Item>

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
export default PreviousEducation;
