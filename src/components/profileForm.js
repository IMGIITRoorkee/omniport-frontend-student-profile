import React from "react";
import { Form, Input, Button, Icon, Label, Segment } from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";

import { Resume } from "./resume";
import style from "../stylesheets/bookForm.css";
import style1 from "../stylesheets/interestForm.css";

const initial = {
  data: { handle: "", description: "", customWebsite: false, resume: null }
};

export class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      createNew: props.createNew,
      resumeLink: props.data.resume,
      resume: null
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
    let data = new FormData();
    data.append("handle", this.state.data.handle);
    data.append("description", this.state.data.description);
    if (this.state.resumeLink != null && this.state.resume != null) {
      data.append("resume", this.state.resume);
    } else if (this.state.resume == null && this.state.resumeLink != null) {
    } else if (this.state.resume == null && this.state.resumeLink == null) {
      data.append("resume", "");
    }

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
        this.props.handleUpdate(response.data, false);
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
    this.setState({
      resume: event.target.files[0],
      resumeLink: event.target.value
    });
    event.target.value = null;
  };
  handleDelete = () => {
    this.setState({
      resume: null,
      resumeLink: null
    });
  };

  render() {
    var res = (
      <Form.Field>
        <input
          type="file"
          onChange={this.handleFile}
          styleName="style1.inputfile"
          id="embedpollfileinput"
        />
        <div styleName="style1.inputLabel">
          <label htmlFor="embedpollfileinput" className="ui blue button">
            <i className="ui upload icon" />
            Upload Resume
          </label>
        </div>
      </Form.Field>
    );

    if (this.state.resumeLink) {
      res = (
        <Form.Field>
          <Resume
            resume={this.state.resumeLink}
            handleDelete={this.handleDelete}
          />
        </Form.Field>
      );
    }
    return (
      <Segment basic>
        <Segment attached styleName="style.headingBox">
          <h3 styleName="style.heading">Profile</h3>
          <Icon color="grey" name="delete" onClick={this.props.handleHide} />
        </Segment>
        <Segment attached styleName="style.formStyle">
          <Form>
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

            {res}
          </Form>
        </Segment>

        <Segment attached styleName="style.buttonBox">
          <Button onClick={this.handleSubmit} color="blue" type="submit">
            Submit
          </Button>
        </Segment>
      </Segment>
    );
  }
}
