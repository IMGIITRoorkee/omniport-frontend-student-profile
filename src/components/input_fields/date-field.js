import React from "react";
import { DateInput } from "semantic-ui-calendar-react";
import { Form } from "semantic-ui-react";

export default function DateField(props) {
  const {
    name,
    value,
    handleChange,
    required,
    label,
    placeholder,
    autoFocus,
    disabled
  } = props;
  return (
    <Form.Field key={name} required={required}>
      <label>{label}</label>
      <DateInput
        autoFocus={autoFocus}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e, { name, value }) => {
          e.persist();
          handleChange(name, value);
        }}
        iconPosition="left"
        dateFormat="YYYY-MM-DD"
      />
    </Form.Field>
  );
}
