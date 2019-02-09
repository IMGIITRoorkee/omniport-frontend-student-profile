import React from "react";
import { Form } from "semantic-ui-react";

export default function TextAreaField(props) {
  const {
    name,
    value,
    handleChange,
    required,
    label,
    placeholder,
    autoFocus
  } = props;
  return (
    <Form.Field key={name} required={required}>
      <label>{label}</label>
      <Form.TextArea
        autoFocus={autoFocus}
        id={name}
        onChange={(e, { name, value }) => {
          e.persist();
          handleChange(name, value);
        }}
        value={value}
        name={name}
        placeholder={placeholder}
      />
    </Form.Field>
  );
}
