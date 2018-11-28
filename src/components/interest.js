import React from "react";
import "./../index.css";
import { Button } from "semantic-ui-react";

export function Interest(props) {
  return (
    <div >
      <p>
        Topic : {props.data.topic}
        <br />
        <Button onClick={() => props.manageData(props.data.id)}>Update</Button>
      </p>
    </div>
  );
}
