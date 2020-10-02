import React from "react";
import { List, Segment } from "semantic-ui-react";
import { EditIcon } from "../editIcon";
import { graduationOptionsMap } from "../../constants/graduationOptions";

import style from "../../styles.css";

const PreviousEducation = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List.Item>
          {/*  */}
          <List.Content>
            <div>
              {props.item.degree} -{' '}
              {graduationOptionsMap[props.item.graduation]} in{' '}
              {props.item.field}
              <div styleName="style.gray">
                {props.item.institute + ', '}
                {props.item.year}
                <br />
                {
                  props.item.isPercentage
                    ? props.item.percentage && (
                        <div styleName="style.gray">Percentage: {props.item.percentage}%</div>
                      )
                    : props.item.cgpa && (
                        <div styleName="style.gray">CGPA: {props.item.cgpa}</div>
                      )
                }
              </div>
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
