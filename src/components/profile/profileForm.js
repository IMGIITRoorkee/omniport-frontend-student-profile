import React from "react";
import {
  Form,
  Button,
  Icon,
  Dropdown,
  Segment
} from "semantic-ui-react";
import axios from "axios";

import { EditUpload } from "../input_fields/editUpload";
import style from "../../styles.css";
import { ComponentTransition, ErrorTransition } from "../transition";

import { headers } from "../../constants/formPostRequestHeaders";
import { themeOptions } from "../../constants/themeOptions";

import { ProfileImagePreview } from "./profileImagePreview";

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
      this.setState({
        handleFieldProperties: { loading: false, color: "green", name: "check" }
      });
    } else {
      this.setState({ handleAvailable: false });
      this.setState({
        handleFieldProperties: { loading: false, color: "red", name: "times" }
      });
    }
  };
  checkHandle = () => {
    const value = this.state.data.handle;
    this.setState({
      handleFieldProperties: { loading: true, color: "green", name: null }
    });
    axios
      .get("/api/student_profile/profile/" + value + "/handle/")
      .then(response => {
        let valid = response.data;
        if (valid == true) {
          this.isHandleAllowed(true);
        } else if(value == this.props.data.handle) {
          this.isHandleAllowed(true);
        }
        else {
          this.isHandleAllowed(false);
        }
      })
      .catch(error => {
        console.log(error);
        this.isHandleAllowed(false);
      });

  }
  handleChange = (event, { name, value }) => {
    event.persist();
    if (this.state.data.hasOwnProperty(name)) {
      this.setState({ data: { ...this.state.data, [name]: value } });
    }
    if (name == "handle") {
      this.checkHandle();
    }
  };
  handleSubmit = e => {
    let {data, createNew, resume, resumeLink, image, img_file} = this.state;
    let {handleUpdate} = this.props;
    let request = new FormData(); // create a form object to attach the image data and the other profile information
    
    request.append("handle", data.handle);
    request.append("theme", data.theme);
    request.append("description", data.description);

    if (resumeLink != null && resume != null) {
      request.append("resume", this.state.resume);
    } else if (resume == null && resumeLink != null) {
    } else if (resume == null && resumeLink == null) {
     request.append("resume", "");
    }
    
    if (image != "" && img_file != "") {
      request.append("image", img_file);
    } else if (img_file == "" && image != "") {
    } else if (img_file == "" && image == "") {
      request.append("image", null);
    }

    let request_type = (createNew)? "post":"patch";
    let url = "/api/student_profile/profile/";
    if(!createNew) url += this.state.data.id + "/";
    
    axios({
      method: request_type,
      data: request,
      url,
      headers
    }).then(response => {
      let data = response.data;
      let displayPicture = data.displayPicture;
      if (displayPicture != null) {
        displayPicture = displayPicture;
      }
      handleUpdate(data, false, displayPicture);
    });
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
    // need lots of code refactoring, why theme is in data also? pass theme using mapstatetoprops, create a change theme function
    const { handle, description, student } = this.state.data;
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
            // this.props.changeTheme(theme);
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
            // this.props.changeTheme(theme);
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
    const { handleFile, handleImageChange, handleDelete, removeImage, handleChange, handleErrors} = this;
    const {image, resumeLink, errors, data} = this.state;
    const {handleHide, theme} = this.props;
    const { name, color, loading } = this.state.handleFieldProperties;
    const buttonClass = "ui " + theme + " button";
    let res = (
      <Form.Field>
        <input
          type="file"
          onChange={handleFile}
          styleName="style.inputfile"
          id="embedpollfileinput1"
        />
        <div styleName="style.inputLabel">
          <label htmlFor="embedpollfileinput1" className={buttonClass}>
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
          onChange={handleImageChange}
          styleName="style.inputfile"
          id="embedpollfileinput"
        />
        <div styleName="style.inputLabel">
          <label htmlFor="embedpollfileinput" className={buttonClass}>
            <i className="ui upload icon" />
            Upload profile image
          </label>
        </div>
      </div>
    );
    if (image) {
      imagePreview = (
        <ProfileImagePreview
          imagePreviewUrl={image.replace(
            "http://localhost:3003/",
            "http://192.168.121.228:60025/"
          )}
          removeImage={removeImage}
        />
      );
    }

    if (resumeLink) {
      res = (
        <Form.Field>
          <EditUpload name={"resume"} handleDelete={handleDelete} />
        </Form.Field>
      );
    }
    return (
      <ComponentTransition>
        <div style={{ minWidth: "350px" }}>
          <Segment attached="top" styleName="style.headingBox">
            <h3 styleName="style.heading">Profile</h3>
            <Icon color="grey" name="delete" onClick={handleHide} />
          </Segment>
          <Segment attached styleName="style.formStyle">
            <ErrorTransition errors={errors} />
            <Form autoComplete="off">
              <Form.Field>{imagePreview}</Form.Field>
              <Form.Field>
                <Form.Input
                  required
                  icon
                  label="Handle"
                  onChange={handleChange}
                  value={data.handle}
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
                  onChange={handleChange}
                  name="theme"
                  options={themeOptions}
                  placeholder="Choose theme options"
                  selection
                  value={data.theme}
                />
              </Form.Field>
              <Form.Field>
                <Form.TextArea
                  label="Description"
                  onChange={handleChange}
                  value={data.description}
                  name="description"
                  placeholder="Describe yourself"
                />
              </Form.Field>

              {res}
            </Form>
          </Segment>

          <Segment attached="bottom" styleName="style.buttonBox">
            <Button onClick={handleErrors} color={theme} type="submit">
              Submit
            </Button>
          </Segment>
        </div>
      </ComponentTransition>
    );
  }
}
