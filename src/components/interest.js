import React from "react";
import "./../index.css";
import { Icon } from "semantic-ui-react";

export default function Interest(props) {
  return (
    <div>
      <p>
        {props.data.topics}
        <Icon name="paw" onClick={() => props.manageData(props.data.id)} />
        <Icon name="delete" />
      </p>
    </div>
  );
}
