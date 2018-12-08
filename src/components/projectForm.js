import React from "react";
import {
  Form,
  Input,
  Button,
  Icon,
  Segment,
  Header,
  Dimmer,
  Message
} from "semantic-ui-react";
import axios from "axios";
import { DateInput } from "semantic-ui-calendar-react";
import { getCookie } from "formula_one";
import { ImagePreview } from "./imagePreview";
import { ProjectList } from "./projectList";
import style from "../stylesheets/interestForm.css";
import inline from "formula_one/src/css/inline.css";
import moment from "moment";

const initial = {
  id: -1,
  topic: "",
  field: "",
  description: "",
  startDate: "",
  endDate: "",
  isFullDate: true,
  file: ""
};

export class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      list: null,
      update: false,
      active: false,
      data: initial,
      errors: []
    };
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscape, false);
  }
  handleEscape = e => {
    console.log("sdf");
    if (e.keyCode === 27) {
      this.handleHide();
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this.handleEscape, false);

    this.fetchData();
  }
  fetchData = () => {
    axios.get("/api/student_profile/project/").then(response => {
      console.log(this);
      this.setState({ list: response.data });
    });
  };
  handleShow = () => {
    this.setState({
      active: true,
      update: false
    });
  };
  handleHide = () => {
    this.setState({
      image: "",
      active: false,
      update: false,
      data: initial
    });
  };

  handleChange = (event, { name = undefined, value }) => {
    event.persist();
    if (this.state.data.hasOwnProperty(name)) {
      this.setState({ data: { ...this.state.data, [name]: value } });
    }
  };

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ data: { ...this.state.data, [name]: value } });
  };

  handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      const image = reader.result;
      this.setState({
        data: { ...this.state.data, file: file },
        image: image
      });
    };

    reader.readAsDataURL(file);
  };
  onSubmit = () => {
    var data = new FormData();
    data.append("topic", this.state.data.topic);
    data.append("field", this.state.data.field);
    data.append("start_date", this.state.data.startDate);
    data.append("end_date", this.state.data.endDate);
    data.append("description", this.state.data.description);
    data.append("image", this.state.data.file);
    console.log(data);
    axios
      .post("/api/student_profile/project/", data, {
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        const d = response.data;
        this.setState({
          list: [...this.state.list, d],
          image: "",
          update: false,
          active: false,
          data: initial,
          errors: []
        });
      });
  };
  onUpdate = () => {
    let that = this;
    var data = new FormData();
    const files = this.state.files;
    const obj = this.state.data;
    data.append("topic", obj.topic);
    data.append("field", obj.field);
    data.append("start_date", obj.startDate);
    data.append("end_date", obj.endDate);
    data.append("description", obj.description);

    if (this.state.image != null && obj.file != null) {
      //image uploaded
      data.append("image", obj.file);
    } else if (this.state.image != null && obj.file == null) {
      //image not modfied
    } else if (this.state.image == null && obj.file == null) {
      //image removed
      data.append("image", "");
    }
    console.log(data);
    axios
      .patch("/api/student_profile/project/" + obj.id + "/", data, {
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        const d = response.data;
        console.log(this.state.list);
        const arr = this.state.list.map(obj => (obj.id == d.id ? d : obj));
        console.log(arr);
        this.setState({
          list: arr,
          image: "",
          update: false,
          active: false,
          data: initial
        });
      });
  };
  onDelete = () => {
    const id = this.state.data.id;
    axios
      .delete("/api/student_profile/project/" + id + "/", {
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(this.state.list);
        const arr = this.state.list.filter(obj =>
          obj.id == id ? false : true
        );
        console.log(arr);
        this.setState({
          list: arr,
          image: "",
          update: false,
          active: false,
          data: initial
        });
      });
  };
  removeImage = () => {
    this.setState({ image: "", data: { ...this.state.data, file: "" } });
  };
  update = data => {
    console.log(data.image);
    if (data.endDate == null) data.endDate = "";
    this.setState({
      update: true,
      data: { ...data, file: "" },
      image: data.image,
      active: true
    });
  };
  handleErrors = () => {
    let errors = [];
    const { topic, field, startDate, endDate, isFullDate } = this.state.data;
    if (topic == "") {
      errors.push("Topic must be filled");
    }
    if (field == "") {
      errors.push("Field must be filled");
    }
    if (startDate != "") {
      if (moment(startDate, "YYYY-MM-DD", true).isValid()) {
        if (endDate != "" && moment(endDate, "YYYY-MM-DD", true).isValid()) {
          if (moment(endDate).isBefore(startDate)) {
            errors.push("Start date must be before end date");
          }
        } else {
          if (endDate != "") {
            errors.push("End date must be of the YYYY-MM-DD format");
          }
        }
      } else {
        errors.push("Start date must be of the YYYY-MM-DD format");
      }
    } else {
      errors.push("Start date must be filled");
    }
    if (errors.length > 0) {
      this.setState({ errors: errors });
    } else {
      this.setState({ errors: [] }, () => {
        if (this.state.update == false) this.onSubmit();
        else this.onUpdate();
      });
    }
  };
  render() {
    console.log(this.state.errors);
    let { list } = this.state;
    const children = <ProjectList arr={list} update={this.update} />;
    let buttonMode = <Button onClick={this.handleErrors}>Submit</Button>;
    if (this.state.update) {
      buttonMode = (
        <div>
          <Button onClick={this.handleErrors}>Update</Button>
          <Button onClick={this.onDelete}>Delete</Button>
        </div>
      );
    }
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
            Upload Image
          </label>
        </div>
      </div>
    );
    if (this.state.image) {
      imagePreview = (
        <ImagePreview
          imagePreviewUrl={this.state.image.replace(
            "http://localhost:3003/",
            "http://192.168.121.228:60025/"
          )}
          removeImage={this.removeImage}
        />
      );
    }

    return (
      <Segment padded>
        <div styleName="style.headingBox">
          <Header styleName="inline.margin-bottom-0">Projects</Header>
          <Icon color="grey" name="add" onClick={this.handleShow} />
        </div>

        <Dimmer active={this.state.active} page>
          <div styleName="style.profileForm">
            <Segment attached styleName="style.headingBox">
              <span>
                <Icon color="blue" name="stop" />
                <h4 styleName="style.heading">PROJECTS</h4>
              </span>

              <Icon name="cancel" color="black" onClick={this.handleHide} />
            </Segment>
            <Segment attached textAlign="left">
              {this.state.errors.length > 0 ? (
                <Message
                  error
                  header="There were some errors with your submission:"
                  list={this.state.errors}
                />
              ) : null}

              <Form autoComplete="off">
                <Form.Field>
                  <Form.Input
                    label="Topic"
                    onChange={this.onChange}
                    value={this.state.data.topic}
                    name="topic"
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    label="Field of work"
                    onChange={this.onChange}
                    value={this.state.data.field}
                    name="field"
                  />
                </Form.Field>
                <Form.Group widths="equal" required>
                  <DateInput
                    dateFormat="YYYY-MM-DD"
                    label="Start date"
                    name="startDate"
                    placeholder="YYYY-MM-DD"
                    value={this.state.data.startDate}
                    iconPosition="left"
                    onChange={this.handleChange}
                  />
                  {this.state.startDate != "" ? (
                    <DateInput
                      dateFormat="YYYY-MM-DD"
                      label="End date"
                      name="endDate"
                      placeholder="YYYY-MM-DD"
                      value={this.state.data.endDate}
                      iconPosition="left"
                      onChange={this.handleChange}
                    />
                  ) : null}
                </Form.Group>
                <Form.Field>
                  <Form.TextArea
                    label="Description"
                    onChange={this.onChange}
                    value={this.state.data.description}
                    name="description"
                    placeholder="Describe your project (Optional)"
                  />
                </Form.Field>

                <Form.Field> {imagePreview}</Form.Field>
              </Form>
            </Segment>
            <Segment attached="bottom" styleName="style.headingBox">
              {buttonMode}
            </Segment>
          </div>
        </Dimmer>
        <Segment.Group> {children}</Segment.Group>
      </Segment>
    );
  }
}
