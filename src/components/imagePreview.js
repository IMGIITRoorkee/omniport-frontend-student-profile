import React from "react";
import { Icon } from "semantic-ui-react";

export default function ImagePreview(props) {
  return (
    <div>
      <img
        src={props.imagePreviewUrl}
        style={{ height: "15vh", width: "15vh" }}
      />
      <Icon
        color="black"
        name="trash"
        onClick={() => {
          props.removeImage();
        }}
      />
    </div>
  );
}
