import React from "react";
import { List, Segment } from "semantic-ui-react";
import { EditIcon } from "./editIcon";
import style from "../styles.css";

const graduationOptions = {
  mat: "Matriculate",
  int: "Intermediate",
  ass: "Associate",
  gra: "Graduate",
  pos: "Postgraduate",
  doc: "Doctorate",
  pdo: "Postdoctorate"
};

const PreviousEducation = props => {
  return (
    <Segment>
      <div styleName="style.flex-box">
        <List.Item>
          {/* <List.Icon name="stop" color="blue" /> */}
          <List.Content>
            <div>
              {props.data.degree} - {graduationOptions[props.data.graduation]}{" "}
              in {props.data.field}
              <p styleName="style.gray1">
                {props.data.institute + ", "}
                {props.data.year}
                <br />
                CGPA {props.data.cgpa}
              </p>
            </div>
          </List.Content>
        </List.Item>

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
export default PreviousEducation;
