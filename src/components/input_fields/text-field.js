import React from "react";
import { Form } from "semantic-ui-react";

export default class TextField extends React.PureComponent {
  render() {
    const { name, field, value, handleChange, error = { error } } = this.props;
    const { required, label, maxLength } = field;
    return (
      <Form.Field>
        <label>{name}</label>
        <Input
          id={name}
          error={error}
          required={required}
          onChange={(e, { name, value }) => handleChange(name, value)}
          value={value}
          name={name}
          placeholder={label}
          maxLength={maxLength || 100}
        />
      </Form.Field>
    );
  }
}
