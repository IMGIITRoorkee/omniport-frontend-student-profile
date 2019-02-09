import React from "react";
import { Form } from "semantic-ui-react";
import { YearInput } from "semantic-ui-calendar-react";

export default class YearField extends React.PureComponent {
  render() {
    const {
      name,
      value,
      handleChange,
      required,
      label,
      placeholder
    } = this.props;
    console.log(this.props);
    return (
      <Form.Field required={required}>
        <label>{label}</label>
        <YearInput
          name={name}
          placeholder={placeholder}
          value={value}
          iconPosition="left"
          onChange={(e, { name, value }) => {
            e.persist();
            handleChange(name, value);
          }}
        />
      </Form.Field>
    );
  }
}
