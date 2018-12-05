import React from "react";
import { Form, Input, Button, Icon, Label } from "semantic-ui-react";
import { DatesRangeInput } from "semantic-ui-calendar-react";
import { getCookie } from "formula_one";
import axios from "axios";
import style from "../stylesheets/interestForm.css";

export const initial = {
  update: false,
  data: { topic: "", id: -1 }
};
export class InterestForm extends React.Component {
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
      this.setState(initial);
    }
  }
  handleChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ data: { ...this.state.data, [name]: value } });
  };

  handleSubmit = e => {
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    axios({
      method: "post",
      url: "/api/student_profile/interest/",
      data: this.state.data,
      headers: headers
    }).then(response => {
      this.props.appendData(response.data);
      this.props.handleHide();
      this.setState(initial);
    });

    e.preventDefault();
  };
  handleUpdateDelete = (e, option) => {
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    axios({
      method: option,
      url: "/api/student_profile/interest/" + this.state.data.id + "/",
      data: this.state.data,
      headers: headers
    }).then(response => {
      this.props.updateDeleteData(this.state.data, option);
      this.setState({
        data: { topic: "", id: -1 },
        update: false
      });
      this.props.handleHide();
    });

    e.preventDefault();
  };

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
