import React from "react";
import "./../index.css";
import { Button, Icon, List, Segment } from "semantic-ui-react";
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
          {!props.rearrange ? (
            <Icon
              name="edit"
              color="grey"
              onClick={() => props.manageData(props.data.id)}
            />
          ) : null}
        </div>
      </div>
    </Segment>
  );
};
export default PreviousEducation;
