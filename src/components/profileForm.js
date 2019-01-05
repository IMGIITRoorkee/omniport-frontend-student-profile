import React from "react";
import {
  Form,
  Message,
  Button,
  Icon,
  Dropdown,
  Segment
} from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";

import { Resume } from "./resume";
import style from "../styles.css";
import { ComponentTransition } from "./transition";

const themeOptions = [
  { text: "Luscious Red", key: "red", value: "red" },
  { text: "Maverick Orange", key: "orange", value: "orange" },
  { text: "Sunkissed Yellow", key: "yellow", value: "yellow" },
  { text: "Disgusting Olive", key: "olive", value: "olive" },
  { text: "Earthly Green", key: "green", value: "green" },
  { text: "Aqua Teal", key: "teal", value: "teal" },
  { text: "Default Blue", key: "blue", value: "blue" },
  { text: "Rich Lavender", key: "violet", value: "violet" },
  { text: "Lightning Purple", key: "purple", value: "purple" },
  { text: "Proud Pink", key: "pink", value: "pink" },
  { text: "Wicked Black", key: "black", value: "black" }
];

const initial = {
  data: {
    handle: "",
    description: "",
    theme: "",
    customWebsite: false,
    resume: null
  }
};
//default handle must be there
export class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      createNew: props.createNew,
      resumeLink: props.data.resume,
      resume: null,
      theme: this.props.theme,
      list: null,
      errors: []
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
  handleChange = (event, { name = undefined, value }) => {
    console.log(this.state.data);
    event.persist();
    if (this.state.data.hasOwnProperty(name)) {
      this.setState({ data: { ...this.state.data, [name]: value } });
    }
  };
  handleSubmit = e => {
    let data = new FormData();
    data.append("handle", this.state.data.handle);
    data.append("theme", this.state.data.theme);
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
  handleErrors = () => {
    let errors = [];
    const { handle, description, theme } = this.state.data;
    console.log(theme);
    console.log(this.props.changeTheme);
    if (handle == "") {
      errors.push("Handle must be filled");
    } else if (handle.match(" ")) {
      errors.push("Handle must not contain spaces");
    }
    if (description == "") {
      errors.push("Description must be filled");
    }
    if (errors.length > 0) {
      this.setState({ errors: errors });
    } else {
      this.setState({ errors: [] }, () => {
        this.props.changeTheme(theme);
        if (this.state.update == false) this.handleSubmit();
        else this.handleSubmit();
      });
    }
  };
  render() {
    console.log(this.state.data.theme);
    var res = (
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
      <ComponentTransition>
        <Segment basic>
          <Segment attached="top" styleName="style.headingBox">
            <h3 styleName="style.heading">Profile</h3>
            <Icon color="grey" name="delete" onClick={this.props.handleHide} />
          </Segment>
          <Segment attached styleName="style.formStyle">
            {this.state.errors.length > 0 ? (
              <Message
                error
                header="There were some errors with your submission:"
                list={this.state.errors}
              />
            ) : null}
            <Form>
              <Form.Field>
                <Form.Input
                  required
                  label="Handle"
                  onChange={this.handleChange}
                  value={this.state.data.handle}
                  name="handle"
                  placeholder="Change your handle"
                />
              </Form.Field>
              <Form.Field required>
                <label>Theme</label>
                <Dropdown
                  onChange={this.handleChange}
                  name="theme"
                  options={themeOptions}
                  placeholder="Choose theme options"
                  selection
                  value={this.state.data.theme}
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

          <Segment attached="bottom" styleName="style.buttonBox">
            <Button onClick={this.handleErrors} color="blue" type="submit">
              Submit
            </Button>
          </Segment>
        </Segment>
      </ComponentTransition>
    );
  }
}
