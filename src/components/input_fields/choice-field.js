import React from "react";
import { Dropdown, Form } from "semantic-ui-react";

export default function ChoiceField(props) {
  const {
    name,
    value,
    options,
    placeholder,
    handleChange,
    required,
    label,
    autoFocus
  } = props;
  return (
    <Form.Field key={name} required={required}>
      <label>{label}</label>
      <Dropdown
        autoFocus={autoFocus}
        onChange={(e, { name, value }) => handleChange(name, value)}
        name={name}
        options={options}
        placeholder={placeholder}
        selection
        value={value}
      />
    </Form.Field>
  );
}
