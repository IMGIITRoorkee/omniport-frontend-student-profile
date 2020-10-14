import React from "react";
import { Form } from "semantic-ui-react";
import { EditUpload } from "./editUpload";
import style from "./../../styles.css";

export default function FileField(props) {
  const { name, handleFile, required, label, link, handleDelete, disabled} = props;
  let res = (
    <Form.Field key={name} required={required}>
      <input
        type="file"
        disabled={disabled}
        onChange={e => {
          e.persist();
          handleFile(e, e.target.files[0], e.target.value, name);
        }}
        styleName="style.inputfile"
        id="embedpollfileinput1"
      />
      <div styleName="style.inputLabel">
        <label htmlFor="embedpollfileinput1" className="ui blue button">
          <i className="ui upload icon" />
          Upload {label}
        </label>
      </div>
    </Form.Field>
  );
  if (link) {
    res = (
      <Form.Field>
        <EditUpload resume={link} name={name} disabled={disabled} handleDelete={() => handleDelete(name)} />
      </Form.Field>
    );
  }
  return res;
}
