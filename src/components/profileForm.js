import React from "react";
import { Form, Input, Button, Icon, Label, Segment } from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";
import style from "../stylesheets/interestForm.css";

const initial = {
  data: { handle: "", description: "", customWebsite: false, resume: null }
};

export class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      createNew: props.createNew,
      resumeLink: props.data.resume
    };
  }

  handleChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ data: { ...this.state.data, [name]: value } });
  };
  handleSubmit = e => {
    let data = new FormData();
    data.append("handle", this.state.data.handle);
    data.append("description", this.state.data.description);
    if (this.state.data.resume) data.append("resume", this.state.data.resume);

    let headers = {
      "X-CSRFToken": getCookie("csrftoken"),
      "Content-type": "multipart/form-data"
    };
    if (this.state.createNew) {
      axios({
        method: "post",
        url: "/api/student_profile/profile/",
        data: data,
        headers: headers
      }).then(response => {
        this.props.handleHide(response.data, false);
      });
    } else {
      axios({
        method: "patch",
        url: "/api/student_profile/profile/" + this.state.data.id + "/",
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
        url: "/api/student_profile/profile/" + this.state.data.id + "/",
        headers: headers
      }).then(response => {
        this.setState({
          data: response.data,
          resumeLink: response.data.resume
        });
      });
    }
  };
  handleFile = event => {
    console.log(event.target.value);
    this.setState({
      data: { ...this.state.data, resume: event.target.files[0] },
      resumeLink: event.target.value
    });
    event.target.value = null;
  };

  render() {
    return (
      <div styleName="style.profileForm">
        <Segment attached styleName="style.headingBox">
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
        </Segment>
        <Segment attached textAlign="left">
          <Form styleName="style.form">
            <Form.Field>
              <Form.Input
                label="Handle"
                onChange={this.handleChange}
                value={this.state.data.handle}
                name="handle"
                placeholder="Change your handle"
              />
            </Form.Field>
            <Form.Field>
              <Form.TextArea
                label="Description"
                onChange={this.handleChange}
                value={this.state.data.description}
                name="description"
                placeholder="Describe yourself"
              />
            </Form.Field>

            <Form.Field>
              <input
                type="file"
                onChange={this.handleFile}
                styleName="style.inputfile"
                id="embedpollfileinput"
              />
              <div styleName="style.inputLabel">
                <label htmlFor="embedpollfileinput" className="ui blue button">
                  <i className="ui upload icon" />
                  Upload Resume
                </label>
              </div>
            </Form.Field>

            <Form.Field>
              <a href={this.state.resumeLink}>{this.state.resumeLink}</a>
            </Form.Field>
          </Form>
        </Segment>
        <Segment attached="bottom" styleName="style.headingBox">
          <Icon
            name="delete"
            circular
            color="red"
            inverted
            onClick={this.handleUpdateDelete}
          />
          <Button primary onClick={this.handleSubmit}>
            Submit
          </Button>
        </Segment>
      </div>
    );
  }
}
