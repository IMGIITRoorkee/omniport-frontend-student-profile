import React from "react";
import { Form, Input, Button, Icon, Dropdown, Segment } from "semantic-ui-react";
import axios from "axios";

import { Resume } from "./resume";
import style from "../../styles.css";
import { ComponentTransition, ErrorTransition } from "../transition";

import { headers } from "../../constants/formPostRequestHeaders";
import { themeOptions } from "../../constants/themeOptions";

import { ProfileImagePreview } from "./profileImagePreview";

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
      errors: [],
      image: props.person_data.displayPicture,
      img_file: "",
      initial_handle: props.data.handle,
      handleFieldProperties: { loading: false, color: null, name: null }
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
    if (e.keyCode === 13) {
      this.handleErrors();
    }
  };
  isHandleAllowed = allowed => {
    if (allowed == true) {
      this.setState({ handleAvailable: true });
      this.setState({ handleFieldProperties: { loading: false, color: "green", name: "check" } });
    } else {
      this.setState({ handleAvailable: false });
      this.setState({ handleFieldProperties: { loading: false, color: "red", name: "times" } });
    }
  };
  handleChange = (event, { name = undefined, value }) => {
    event.persist();
    if (this.state.data.hasOwnProperty(name)) {
      this.setState({ data: { ...this.state.data, [name]: value } });
    }
    if (name == "handle") {
      console.log("handle field");
      const oldProperties = this.state.handleFieldProperties;
      this.setState({ handleFieldProperties: { loading: true, color: "green", name: null } });
      console.log("value", value, typeof value);
      axios
        .get("/api/student_profile/profile/" + value + "/handle/")
        .then(response => {
          if (value == this.props.data.handle) {
            this.isHandleAllowed(true);
          } else {
            this.isHandleAllowed(false);
          }
        })
        .catch(error => {
          console.log(error);
          if (error.response.status == 404 && value != "") {
            this.isHandleAllowed(true);
          } else {
            this.isHandleAllowed(false);
          }
        });
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
    if (this.state.image != "" && this.state.img_file != "") {
      data.append("image", this.state.img_file);
    } else if (this.state.img_file == "" && this.state.image != "") {
    } else if (this.state.img_file == "" && this.state.image == "") {
      data.append("image", null);
    }

    let request_type = "patch";
    if (this.state.createNew) request_type = "post";
    if (this.state.createNew) {
      axios({
        method: request_type,
        url: "/api/student_profile/profile/",
        data: data,
        headers: headers
      }).then(response => {
        let data = response.data;
        let displayPicture = data.displayPicture;
        if (displayPicture != null) {
          displayPicture = displayPicture;
        }

        this.props.handleUpdate(data, false, displayPicture);
      });
    } else {
      axios({
        method: request_type,
        url: "/api/student_profile/profile/" + this.state.data.id + "/",
        data: data,
        headers: headers
      }).then(response => {
        let data = response.data;
        let displayPicture = data.displayPicture;
        if (displayPicture != null) {
          displayPicture = displayPicture;
        }
        this.props.handleUpdate(data, false, displayPicture);
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
    const { handle, description, theme, student } = this.state.data;
    const { createNew } = this.state;

    if (handle == "") {
      errors.push("Handle must be filled");
    }
    if (description == "") {
      errors.push("Description must be filled");
    }
    axios({
      method: "get",
      url: "/api/student_profile/profile/" + handle + "/handle/",
      headers: headers
    })
      .then(response => {
        if (createNew == true || response.data.student != student) {
          errors.push("Handle is already taken");
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
      })
      .catch(error => {
        if (errors.length > 0) {
          this.setState({ errors: errors });
        } else {
          this.setState({ errors: [] }, () => {
            this.props.changeTheme(theme);
            if (this.state.update == false) this.handleSubmit();
            else this.handleSubmit();
          });
        }
      });
  };
  handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      const image = reader.result;
      this.setState({
        img_file: file,
        image: image
      });
    };

    reader.readAsDataURL(file);
  };
  removeImage = () => {
    this.setState({ image: "", img_file: "" });
  };
  render() {
    const { name, color, loading } = this.state.handleFieldProperties;

    let res = (
      <Form.Field>
        <input type="file" onChange={this.handleFile} styleName="style.inputfile" id="embedpollfileinput1" />
        <div styleName="style.inputLabel">
          <label htmlFor="embedpollfileinput1" className="ui blue button">
            <i className="ui upload icon" />
            Upload Resume
          </label>
        </div>
      </Form.Field>
    );
    let imagePreview = (
      <div>
        <input type="file" onChange={this.handleImageChange} styleName="style.inputfile" id="embedpollfileinput" />
        <div styleName="style.inputLabel">
          <label htmlFor="embedpollfileinput" className="ui blue button">
            <i className="ui upload icon" />
            Upload profile image
          </label>
        </div>
      </div>
    );
    if (this.state.image) {
      imagePreview = (
        <ProfileImagePreview
          imagePreviewUrl={this.state.image.replace("http://localhost:3003/", "http://192.168.121.228:60025/")}
          removeImage={this.removeImage}
        />
      );
    }

    if (this.state.resumeLink) {
      res = (
        <Form.Field>
          <Resume name={"resume"} handleDelete={this.handleDelete} />
        </Form.Field>
      );
    }
    return (
      <ComponentTransition>
        <div style={{ minWidth: "350px" }}>
          <Segment attached="top" styleName="style.headingBox">
            <h3 styleName="style.heading">Profile</h3>
            <Icon color="grey" name="delete" onClick={this.props.handleHide} />
          </Segment>
          <Segment attached styleName="style.formStyle">
            <ErrorTransition errors={this.state.errors} />
            <Form autoComplete="off">
              <Form.Field>{imagePreview}</Form.Field>
              <Form.Field>
                <Form.Input
                  required
                  icon
                  label="Handle"
                  onChange={this.handleChange}
                  value={this.state.data.handle}
                  name="handle"
                  placeholder="Change your handle"
                  loading={loading}
                >
                  <Icon name={name} color={color} />
                  <input />
                </Form.Input>
              </Form.Field>
              <Form.Field required styleName="style.themeField">
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
        </div>
      </ComponentTransition>
    );
  }
}
