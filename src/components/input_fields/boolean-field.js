import React from "react";
import { Checkbox, Form } from "semantic-ui-react";

export default function BooleanField(props) {
  const { name, handleChange, required, label, value, autoFocus } = props;
  return (
    <Form.Field key={name} required={required} autoFocus={autoFocus}>
      <Checkbox
        autoFocus={autoFocus}
        name={name}
        id={name}
        label={label}
        onChange={() => handleChange(name, !value)}
        checked={value}
      />
    </Form.Field>
  );
}
