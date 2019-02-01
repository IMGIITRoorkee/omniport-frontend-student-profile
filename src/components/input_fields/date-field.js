import React from "react";
import { DateInput, Form } from "semantic-ui-calendar-react";

export default class DateField extends React.PureComponent {
  render() {
    const { name, field, value, handleChange, error } = this.props;
    const { required, label, maxLength } = field;
    return (
      <Form.Field required={required}>
        <label>{label}</label>
        <DateInput
            id={name}
            name={name}
            placeholder={label}
            value={value}
            maxLength={maxLength}
            onChange={(e, { name, value }) => {
            e.persist();
            handleChange(name, value);
            }}
            iconPosition="left"
            error={error}
          />
       
      </Form.Field>
    );
  }
}
