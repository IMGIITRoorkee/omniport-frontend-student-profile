import React from "react";
import { Form, Input } from "semantic-ui-react";

export default class TextField extends React.PureComponent {
  render() {
    const { name, value, handleChange, required, label, placeholder, autoFocus } = this.props;
    return (
      <Form.Field required={required} >
        <label>{label}</label>
        <Input
        autoFocus = {autoFocus}
          id={name}
          onChange={(e, { name, value }) => {
            e.persist();
            handleChange(name, value)}}
          value={value}
          name={name}
          placeholder={placeholder}
        />
      </Form.Field>
    );
  }
}


//error needs to be added
