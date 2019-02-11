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
        <List>
          <List.Item>
            <List.Icon name="stop" color="blue" />
            <List.Content>
              <div>
                <p>
                  {props.data.degree} -{" "}
                  {graduationOptions[props.data.graduation]} in{" "}
                  <b>{props.data.field}</b>
                </p>
                <p>
                  {props.data.institute}-{props.data.year}
                </p>
                <p>CGPA: {props.data.cgpa}</p>
              </div>
            </List.Content>
          </List.Item>
        </List>
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
