import React from "react";
import ImagePreview from "../imagePreview";
import style from "./../../styles.css";

export default function ImageField(props) {
  const { name, handleImageChange, removeImage, link } = props;
  console.log(props);
  let imagePreview = (
    <div>
      <input
        name={name}
        type="file"
        onChange={e => handleImageChange(e, name)}
        styleName="style.inputfile"
        id={name}
      />
      <div styleName="style.inputLabel">
        <label htmlFor={name} className="ui blue button">
          <i className="ui upload icon" />
          Upload Image
        </label>
      </div>
    </div>
  );
  if (link) {
    imagePreview = (
      <ImagePreview
        imagePreviewUrl={link}
        removeImage={() => removeImage(name)}
      />
    );
  }
  return imagePreview;
}
