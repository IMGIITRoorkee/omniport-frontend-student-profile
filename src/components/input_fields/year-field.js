import React from "react";
import { Form } from "semantic-ui-react";
import { YearInput } from "semantic-ui-calendar-react";

export default function YearField(props) {
  const { name, value, handleChange, required, label, placeholder, disabled } = props;
  return (
    <Form.Field key={name} required={required}>
      <label>{label}</label>
      <YearInput
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        iconPosition="left"
        onChange={(e, { name, value }) => {
          e.persist();
          handleChange(name, value);
        }}
      />
    </Form.Field>
  );
}
