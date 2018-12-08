import React from "react";
import { Form, Input, Button, Icon, Label, Segment } from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";

import { Resume } from "./resume";
import style from "../stylesheets/interestForm.css";

const initial = {
  data: {
    computerLanguages: "",
    softwarePackages: "",
    additionalCourses: "",
    minorCourses: "",
    languages: ""
  }
};

export class SkillForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      createNew: props.createNew
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleEscape, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscape, false);
  }
  handleEscape = e => {
    if (e.keyCode === 27) {
      this.props.handleHide();
    }
  };
  handleChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ data: { ...this.state.data, [name]: value } });
  };
  handleSubmit = e => {
    let data = this.state.data;

    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    if (this.state.createNew) {
      axios({
        method: "post",
        url: "/api/student_profile/skill/",
        data: data,
        headers: headers
      }).then(response => {
        this.props.handleUpdate(response.data, false);
      });
    } else {
      axios({
        method: "patch",
        url: "/api/student_profile/skill/" + this.state.data.id + "/",
        data: data,
        headers: headers
      }).then(response => {
        this.props.handleUpdate(response.data, false);
      });
    }
    e.preventDefault();
  };
  handleUpdateDelete = () => {
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    if (!this.state.createNew) {
      axios({
        method: "delete",
        url: "/api/student_profile/skill/" + this.state.data.id + "/",
        headers: headers
      }).then(response => {
        this.setState({
          data: response.data
        });
      });
    }
  };

  render() {
    return (
      <div styleName="style.profileForm">
        <Segment attached styleName="style.headingBox">
          <span>
            <Icon color="blue" name="stop" />
            <h4 styleName="style.heading">PROFILE</h4>
          </span>

          <Icon
            bordered
            name="cancel"
            color="black"
            onClick={this.props.handleHide}
          />
        </Segment>
        <Segment attached textAlign="left">
          <Form styleName="style.form">
            <Form.Field>
              <Form.TextArea
                label="Additional Courses"
                onChange={this.handleChange}
                value={this.state.data.additionalCourses}
                name="additionalCourses"
                placeholder="Leave blank if none"
              />
            </Form.Field>
            <Form.Field>
              <Form.TextArea
                label="Computer Languages"
                onChange={this.handleChange}
                value={this.state.data.computerLanguages}
                name="computerLanguages"
                placeholder="Leave blank if none"
              />
            </Form.Field>
            <Form.Field>
              <Form.TextArea
                label="Software Packages"
                onChange={this.handleChange}
                value={this.state.data.softwarePackages}
                name="softwarePackages"
                placeholder="Leave blank if none"
              />
            </Form.Field>
            <Form.Field>
              <Form.TextArea
                label="Minor Courses"
                onChange={this.handleChange}
                value={this.state.data.minorCourses}
                name="minorCourses"
                placeholder="Leave blank if none"
              />
            </Form.Field>
            <Form.Field>
              <Form.TextArea
                label="Languages"
                onChange={this.handleChange}
                value={this.state.data.languages}
                name="languages"
                placeholder="Leave blank if none"
              />
            </Form.Field>
          </Form>
        </Segment>
        <Segment attached="bottom" styleName="style.headingBox">
          <Button primary onClick={this.handleSubmit}>
            Submit
          </Button>
        </Segment>
      </div>
    );
  }
}
