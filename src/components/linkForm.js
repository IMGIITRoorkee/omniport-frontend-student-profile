import React from "react";
import { Form, Input, Button, Icon, Label, Dropdown, Container } from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";
import style from "../stylesheets/interestForm.css";

const initial = {
  update:false,
  data: { site:'Github', url:'', id: -1 }
}
const options = [
  {key:'Github', text:'Github', value:'Github'},
  {key:'Facebook', text:'Facebook', value:'Facebook'},
  {key:'LinkedIn', text:'LinkedIn', value:'LinkedIn'},
  {key:'Other Website', text:'Other Website', value:'Other Website'}
]
export class LinkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: initial.data
    };
  }
  
  componentWillUpdate(nextProps, nextState) {
    if (this.props != nextProps && nextProps.update == true) {
      this.setState({
        data: nextProps.formData,
        update: nextProps.update
      });
    } else if (this.props != nextProps && nextProps.update == false) {
      this.setState({
        data: { topic: "", id: -1 },
        update: false
      });
    }
  }
  onChange = (event, data) =>
  {
    const {value} = data;
    this.setState({data:{...this.state.data, site:value}});
    

  }
  handleChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    console.log(e.target);
    this.setState({ data: { ...this.state.data, [name]: value } });
    console.log(this.state.data);
  };
  handleSubmit = e => {
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    axios({
      method: "post",
      url: "/api/student_profile/social_link/",
      data: this.state.data,
      headers: headers
    }).then((response)=> {
      this.props.fetchData();
      this.props.appendDate(response.data);
      this.props.handleHide();
      this.setState({
        data: { topic: "", id: -1 },
        update: false
      });
    });
    e.preventF-Default();
  }

  handleUpdateDelete = (e, option) => {
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    axios({
      method: option,
      url: "/api/student_profile/interest/" + this.state.data.id + "/",
      data: this.state.data,
      headers: headers
    }).then((response)=> {
      this.props.fetchData();
      this.setState({
        data: { topic: "", id: -1 },
        update: false
      });
      this.props.handleHide();
    });

    e.preventDefault();
  }


  render() {
    console.log(this.state.data);
    return (
      <div styleName="style.formStyle">
        <div styleName="style.headingBox">
          <span>
            <Icon color="blue" name="stop" />
            <h4 styleName="style.heading">SOCIAL MEDIA LINKS</h4>
          </span>

          <Icon
            bordered
            name="cancel"
            color="black"
            onClick={this.props.handleHide}
          />
        </div>

        <Form styleName="style.form">
        <Form.Group inline>
         <Form.Field>
           <label>Site</label>
          <Dropdown  selection defaultValue='Github'  name="site" onChange={this.onChange} options={options}/>
          </Form.Field>
          <Form.Field>
            <Form.Input
              label="URL"
              onChange={this.handleChange}
              value={this.state.data.topic}
              name="url"
              placeholder="Add interest ..."
            />
          </Form.Field>
          
          </Form.Group>
          
        </Form>

        
    
      </div>
    );
  }
}
