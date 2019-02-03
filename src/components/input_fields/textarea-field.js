import React from 'react'
import { Form } from 'semantic-ui-react'

import Field from './field'

export default class TextAreaField extends React.PureComponent {
  render () {
    const { name, value, handleChange, required, label, placeholder, autoFocus } = this.props;
    return (
      
        <Form.Field required = {required}>
          <label>{label}</label>
          <Form.TextArea
          autoFocus = {autoFocus}
          id={name}
          onChange={(e, { name, value }) => {
            e.persist();
            handleChange(name, value)}}
          value={value}
          name={name}
          placeholder={placeholder}
          />
        </Form.Field>
          
        
    )
  }
}
