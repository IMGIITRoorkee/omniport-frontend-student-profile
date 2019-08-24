import React from "react";
import { Form, Button, Icon, Confirm, Segment } from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";

import style from "../../styles.css";
import { ComponentTransition, ErrorTransition } from "../transition";

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
      createNew: props.createNew,
      list: null,
      errors: []
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }
  handleKeyPress = e => {
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
  handleDelete = () => {
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    if (!this.state.createNew) {
      axios({
        method: "delete",
        url: "/api/student_profile/skill/" + this.state.data.id + "/",
        headers: headers
      }).then(response => {
        this.props.handleUpdate(initial.data, true);
      });
    }
  };

  render() {
    const { createNew } = this.state;
    return (
      <Segment basic>
        <Segment attached="top" styleName="style.headingBox">
          <h3 styleName="style.heading">Skills</h3>
          <Icon color="grey" name="delete" onClick={this.props.handleHide} />
        </Segment>
        <Segment attached styleName="style.formStyle">
          <ErrorTransition errors={this.state.errors} />
          <Form styleName="style.formStyle3">
            <Form.Field>
              <Form.TextArea
                autoFocus
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
            <Form.Field>
              <Form.TextArea
                label="Additional Courses"
                onChange={this.handleChange}
                value={this.state.data.additionalCourses}
                name="additionalCourses"
                placeholder="Leave blank if none"
              />
            </Form.Field>
          </Form>
          <Confirm
            header="Delete"
            open={this.state.open}
            content="Are you sure you want to delete?"
            onConfirm={this.handleDelete}
            onCancel={() => {
              this.setState({ open: false });
            }}
          />
        </Segment>
        {!createNew ? (
          <Segment attached="bottom" styleName="style.headingBox">
            <div
              styleName="style.delete"
              onClick={() => {
                this.setState({ open: true });
              }}
            >
              Delete
            </div>
            <Button onClick={this.handleSubmit} color="blue">
              Save Changes
            </Button>
          </Segment>
        ) : (
          <Segment attached="bottom" styleName="style.headingBox">
            <Button onClick={this.handleSubmit} color="blue" type="submit">
              Submit
            </Button>
          </Segment>
        )}
      </Segment>
    );
  }
}
