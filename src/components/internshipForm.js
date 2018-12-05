import React from "react";
import { Form, Input, Button, Icon, Label, Segment } from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";
import style from "../stylesheets/internshipForm.css";
import { DateInput } from "semantic-ui-calendar-react";
function camelToUnderscore(key) {
  return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}
export const initial = {
  update: false,
  data: {
    id: -1,
    startDate: "",
    endDate: "",
    isFullDate: "true",
    position: "",
    organisation: "",
    description: "",
    priority: 1,
    visibility: true,
    experienceType: "int"
  }
};
export class InternshipForm extends React.Component {
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
  handleChange = (event, { name = undefined, value }) => {
    event.persist();
    if (this.state.data.hasOwnProperty(name)) {
      this.setState({ data: { ...this.state.data, [name]: value } });
    }
  };
  handleSubmit = e => {
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    //converting to snake case for sending
    const newObject = {};
    const original = this.state.data;
    for (var camel in original) {
      newObject[camelToUnderscore(camel)] = original[camel];
    }

    axios({
      method: "post",
      url: "/api/student_profile/experience/",
      data: newObject,
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
    //converting to snake case for sending
    const newObject = {};
    const original = this.state.data;
    for (var camel in original) {
      newObject[camelToUnderscore(camel)] = original[camel];
    }

    axios({
      method: option,
      url: "/api/student_profile/experience/" + this.state.data.id + "/",
      data: newObject,
      headers: headers
    }).then(response => {
      this.props.updateDeleteData(original, option);
      this.setState(initial);
      this.props.handleHide();
    });

    e.preventDefault();
  };

  render() {
    console.log(this.state.data);
    const { update } = this.state;
    return (
      <Segment basic styleName="style.formStyle">
        <Segment attached="top" styleName="style.headingBox">
          {/* <Icon color="blue" name="stop" /> */}
          <h4 styleName="style.heading">EXPERIENCE</h4>
        </Segment>
        {/* <Icon
            bordered
            name="cancel"
            color="black"
            onClick={this.props.handleHide}
          /> */}

        {/* <Form styleName="style.form"> */}

        <Segment attached>
          <Form autoComplete="off">
            <Form.Field>
              <Form.Input
                // fluid
                label="Position"
                onChange={this.handleChange}
                value={this.state.data.position}
                name="position"
                placeholder="Position"
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                // fluid
                label="Organisation"
                onChange={this.handleChange}
                value={this.state.data.organisation}
                name="organisation"
                placeholder="Organisation"
              />
            </Form.Field>

            <Form.Group widths="equal">
              <DateInput
                dateFormat="YYYY-MM-DD"
                label="Start Date"
                name="startDate"
                placeholder="Start Date [YYYY-MM-DD]"
                value={this.state.data.startDate}
                iconPosition="left"
                onChange={this.handleChange}
              />
              <DateInput
                dateFormat="YYYY-MM-DD"
                label="End Date"
                name="endDate"
                placeholder="End Date [YYYY-MM-DD]"
                value={this.state.data.endDate}
                iconPosition="left"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Field>
              <Form.TextArea
                label="Description"
                onChange={this.handleChange}
                value={this.state.data.description}
                name="description"
                placeholder="Description"
              />
            </Form.Field>

            {update ? (
              <span>
                <Button
                  onClick={e => this.handleUpdateDelete(e, "put")}
                  color="blue"
                >
                  Save Changes
                </Button>
                <Button onClick={e => this.handleUpdateDelete(e, "delete")}>
                  Delete
                </Button>
              </span>
            ) : (
              <Button onClick={this.handleSubmit} color="blue" type="submit">
                Submit
              </Button>
            )}
            <Button onClick={this.props.handleHide}>Cancel</Button>
          </Form>
        </Segment>
      </Segment>
    );
  }
}
