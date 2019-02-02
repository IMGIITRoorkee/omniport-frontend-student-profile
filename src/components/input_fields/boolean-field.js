import React from "react";
import { Checkbox, Form } from "semantic-ui-react";



export default class BooleanField extends React.PureComponent {
  render() {
    const { name,  checked, handleChange, error, required, label, value, placeholder } = this.props;
    return (
      <Form.Field required = {required}>
      <Checkbox name = {name} id = {name } label={label} onChange={() => handleChange(name, !value)} checked={value} />
      </Form.Field>
       
    );
      }
}
