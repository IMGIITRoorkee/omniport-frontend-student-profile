import React from "react";
import { Form, Input } from "semantic-ui-react";

export default function TextField(props) {
  const {
    name,
    value,
    handleChange,
    required,
    label,
    placeholder,
    autoFocus,
    width,
    disabled
  } = props;
  return (
    <Form.Field key={name} width={width} required={required}>
      <label>{label}</label>
      <Input
        autoFocus={autoFocus}
        id={name}
        onChange={(e, { name, value }) => {
          e.persist();
          handleChange(name, value);
        }}
        value={value}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
      />
    </Form.Field>
  );
}

//error needs to be added
