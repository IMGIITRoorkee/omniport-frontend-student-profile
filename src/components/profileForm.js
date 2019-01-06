import React from "react";
import { Form, Message, Button, Icon, Label, Segment } from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";

import { Resume } from "./resume";
import style from "../styles.css";
import { ComponentTransition } from "./transition";
import { ProfileImagePreview } from "./profileImagePreview";
const initial = {
  data: { handle: "", description: "", customWebsite: false, resume: null }
};
//default handle must be there
export class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      data: props.data,
      createNew: props.createNew,
      resumeLink: props.data.resume,
      resume: null,
      list: null,
      errors: [],
      image: props.person_data.displayPicture,
      img_file: ""
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
    console.log(this.state.img_file);
    console.log(this.state.image);
    data.append("handle", this.state.data.handle);
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
      console.log("no change");
    } else if (this.state.img_file == "" && this.state.image == "") {
      data.append("image", null);
    }

    let headers = {
      "X-CSRFToken": getCookie("csrftoken"),
      "Content-type": "multipart/form-data"
    };
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
        console.log(displayPicture);
        if (displayPicture.search("http://localhost:3000") == -1) {
          displayPicture = "http://localhost:3000" + displayPicture;
        }
        console.log("hello");
        console.log(data);
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
        console.log(displayPicture);
        if (displayPicture.search("http://localhost:3000") == -1) {
          displayPicture = "http://localhost:3000" + displayPicture;
        }
        console.log("hello");
        console.log(data);
        this.props.handleUpdate(data, false, displayPicture);
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
    console.log("hello");
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
    const { handle, description } = this.state.data;
    if (handle == "") {
      errors.push("Handle must be filled");
    }
    if (description == "") {
      errors.push("Description must be filled");
    }
    if (errors.length > 0) {
      this.setState({ errors: errors });
    } else {
      this.setState({ errors: [] }, () => {
        if (this.state.update == false) this.handleSubmit();
        else this.handleSubmit();
      });
    }
  };
  handleImageChange = e => {
    console.log("ho ho");
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
    console.log(this.state);
    let res = (
      <Form.Field>
        <input
          type="file"
          onChange={this.handleFile}
          styleName="style.inputfile"
          id="embedpollfileinput1"
        />
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
        <input
          type="file"
          onChange={this.handleImageChange}
          styleName="style.inputfile"
          id="embedpollfileinput"
        />
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
          imagePreviewUrl={this.state.image.replace(
            "http://localhost:3003/",
            "http://192.168.121.228:60025/"
          )}
          removeImage={this.removeImage}
        />
      );
    }

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
              <Form.Field>{imagePreview}</Form.Field>
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
