import React from "react";
import {Form} from "semantic-ui-react";
import {Resume} from "./../resume";
import style from "./../../styles.css";

export default class FileField extends React.PureComponent {
  render() {
    const { name,  handleFile,  required, label, link, handleDelete } = this.props;

    let res = (
        <Form.Field required={required}>
          <input type="file" onChange={(e, { name, value }) => {
            e.persist();
            handleFile(e, name, value)}}
          styleName="style.inputfile" 
          id="embedpollfileinput1" />
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
            <Resume resume={link} handleDelete={() => handleDelete(name)} />
          </Form.Field>
        );
      }
    return res;
  }
}
