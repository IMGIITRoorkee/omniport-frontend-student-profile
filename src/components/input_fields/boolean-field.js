import React from "react";
import { Checkbox, Form } from "semantic-ui-react";



export default class BooleanField extends React.PureComponent {
  render() {
    const { name,  checked, handleChange, error, required, label, value, placeholder, autoFocus } = this.props;
    return (
      <Form.Field required = {required} autoFocus = {autoFocus}>
      <Checkbox autoFocus = {autoFocus} name = {name} id = {name } label={label} onChange={() => handleChange(name, !value)} checked={value} />
      </Form.Field>
       
    );
      }
}
