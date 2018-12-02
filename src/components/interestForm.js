import React from "react";
import { Form, Input, Button, Icon, Label } from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";
import style from "../stylesheets/interestForm.css";

export class InterestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { topic: "", id: -1 }
    };
  }
  handleChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ data: { ...this.state.data, [name]: value } });
  };
  handleSubmit = e => {
    console.log(this.state.data);
    let self = this;
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    console.log(this.state.data);
    axios({
      method: "post",
      url: "/api/student_profile/interest/",
      data: this.state.data,
      headers: headers
    }).then(function(response) {
      self.props.fetchData();
      self.props.handleHide();
      this.setState({
        data: { topic: "", id: -1 },
        update: false
      });
    });

    e.preventDefault();
  };
  handleUpdateDelete = (e, option) => {
    console.log(this.state.data);
    let self = this;
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    console.log(this.state.data);
    axios({
      method: option,
      url: "/api/student_profile/interest/" + this.state.data.id + "/",
      data: this.state.data,
      headers: headers
    }).then(function(response) {
      console.log(response);
      self.props.fetchData();
      self.setState({
        data: { topic: "", id: -1 },
        update: false
      });
      self.props.handleHide();
    });

    e.preventDefault();
  };

  componentWillUpdate(nextProps, nextState) {
    if (this.props != nextProps && nextProps.update == true) {
      console.log(nextProps);
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
  render() {
    return (
      <div styleName="style.formStyle">
        <div styleName="style.headingBox">
          <span>
            <Icon color="blue" name="stop" />
            <h4 styleName="style.heading">INTERESTS</h4>
          </span>

          <Icon
            bordered
            name="cancel"
            color="black"
            onClick={this.props.handleHide}
          />
        </div>

        <Form styleName="style.form">
          <Form.Field>
            <Form.Input
              fluid
              label="Topic"
              onChange={this.handleChange}
              value={this.state.data.topic}
              name="topic"
              placeholder="Add interest ..."
            />
          </Form.Field>
        </Form>

        {this.props.update ? (
          <div styleName="style.bottomBar">
            <Button onClick={e => this.handleUpdateDelete(e, "delete")}>
              Delete
            </Button>
            <Button primary onClick={e => this.handleUpdateDelete(e, "put")}>
              Save Changes
            </Button>
          </div>
        ) : (
          <div styleName="style.bottomBar">
            <Button primary onClick={this.handleSubmit}>
              Submit
            </Button>
          </div>
        )}
      </div>
    );
  }
}
