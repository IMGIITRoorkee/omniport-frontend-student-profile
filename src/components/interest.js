import React from "react";
import "./../index.css";
import { Icon } from "semantic-ui-react";

export default function Interest(props) {
  return (
    <div>
      <p>
        {props.data.topics}
        <Icon
          name="paw"
          size="large"
          onClick={() => props.manageData(props.data.id)}
        />
      </p>
    </div>
  );
}
