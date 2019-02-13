import React from "react";
import { Form } from "semantic-ui-react";
import { YearInput } from "semantic-ui-calendar-react";

export default function YearField(props) {
  const { name, value, handleChange, required, label, placeholder } = props;
  console.log(value);
  return (
    <Form.Field key={name} required={required}>
      <label>{label}</label>
      <YearInput
        name={name}
        placeholder={placeholder}
        value={`${value}`}
        iconPosition="left"
        onChange={(e, { name, value }) => {
          e.persist();
          handleChange(name, value);
        }}
      />
    </Form.Field>
  );
}
