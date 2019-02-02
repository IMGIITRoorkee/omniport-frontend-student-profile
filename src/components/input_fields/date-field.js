import React from "react";
import { DateInput } from "semantic-ui-calendar-react";
import {Form} from "semantic-ui-react";

export default class DateField extends React.PureComponent {
  render() {
    const { name, value, handleChange, error , required, label, placeholder} = this.props;
    return (
      <Form.Field required={required}>
        <label>{label}</label>
        <DateInput
            id={name}
            name={name}
            placeholder={label}
            value={value}
            onChange={(e, { name, value }) => {
            e.persist();
            handleChange(name, value);
            }}
            iconPosition="left"
          />
       
      </Form.Field>
    );
  }
}
