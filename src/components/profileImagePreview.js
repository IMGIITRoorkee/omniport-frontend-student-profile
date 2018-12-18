import React from "react";
import { Icon, Image, Segment } from "semantic-ui-react";
import style from "../styles.css";
export function ProfileImagePreview(props) {
  return (
    <Segment basic styleName="style.headingBox">
      <Image src={props.imagePreviewUrl} size="small" circular />
      <Icon
        color="black"
        name="trash"
        onClick={() => {
          props.removeImage();
        }}
      />
    </Segment>
  );
}
