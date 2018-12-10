import React from "react";
import {
  Form,
  Input,
  Button,
  Icon,
  Label,
  Segment,
  Dropdown
} from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";

import style from "../stylesheets/bookForm.css";
import { YearInput } from "semantic-ui-calendar-react";

const graduationOptions = [
  { text: "Matriculate", key: "MATRICULATE", value: "mat" },
  { text: "Intermediate", key: "INTERMEDIATE", value: "int" },
  { text: "Associate", key: "ASSOCIATE", value: "ass" },
  { text: "Graduate", key: "GRADUATE", value: "gra" },
  { text: "Postgraduate", key: "POSTGRADUATE", value: "pos" },
  { text: "Doctorate", key: "DOCTORATE", value: "doc" },
  { text: "Postdoctorate", key: "POSTDOCTORATE", value: "pdo" }
];
export const initial = {
  update: false,
  data: {
    year: "",
    institute: "",
    subject: "",
    degree: "",
    graduation: "",
    priority: 1,
    visibility: true,
    cgpa: "",
    percentage: "98",
    is_percentage: false
  }
};
export class PreviousEducationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.formData,
      update: this.props.update
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
    console.log(event);
    if (this.state.data.hasOwnProperty(name)) {
      this.setState({ data: { ...this.state.data, [name]: value } });
    }
  };
  handleSubmit = e => {
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    axios({
      method: "post",
      url: "/api/student_profile/previous_education/",
      data: this.state.data,
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
    axios({
      method: option,
      url:
        "/api/student_profile/previous_education/" + this.state.data.id + "/",
      data: this.state.data,
      headers: headers
    }).then(response => {
      this.props.updateDeleteData(this.state.data, option);
      this.setState(initial);
      this.props.handleHide();
    });

    e.preventDefault();
  };

  render() {
    const { update } = this.state;
    const {
      year,
      institute,
      subject,
      degree,
      graduation,
      cgpa,
      percentage
    } = this.state.data;
    return (
      <Segment basic>
        <Segment attached styleName="style.headingBox">
          <h4 styleName="style.heading">PREVIOUS EDUCATION</h4>
          <Icon
            color="grey"
            name="delete"
            size="large"
            onClick={this.props.handleHide}
          />
        </Segment>

        <Segment attached styleName="style.formStyle">
          <Form autoComplete="off">
            <Form.Group widths="equal">
              <Form.Field required>
                <label>Institute</label>
                <Form.Input
                  onChange={this.handleChange}
                  value={institute}
                  name="institute"
                  placeholder="Institute"
                />
              </Form.Field>
              <Form.Field required>
                <label>Degree</label>
                <Form.Input
                  onChange={this.handleChange}
                  value={degree}
                  name="degree"
                  placeholder="Degree"
                />
              </Form.Field>
            </Form.Group>
            <Form.Field required>
              <label>Graduation</label>
              <Dropdown
                onChange={this.handleChange}
                name="graduation"
                options={graduationOptions}
                placeholder="Choose Graduation options"
                selection
                value={graduation}
              />
            </Form.Field>
            <Form.Field required>
              <label>Subject</label>
              <Form.Input
                onChange={this.handleChange}
                value={subject}
                name="subject"
                placeholder="Subject (Ex- Science or Commerce)"
              />
            </Form.Field>

            <Form.Field required>
              <label>CGPA</label>
              <Form.Input
                onChange={this.handleChange}
                value={cgpa}
                name="cgpa"
                placeholder="CGPA"
              />
            </Form.Field>
            <YearInput
              closable={true}
              popupPosition="bottom left"
              label="Year"
              name="year"
              placeholder="Year"
              value={year}
              iconPosition="left"
              onChange={this.handleChange}
            />

            {/* <Form.Field required>
                <label>Graduation</label>
                <Form.Input
                  onChange={this.handleChange}
                  value={graduation}
                  name="graduation"
                  placeholder="Graduation"
                />
              </Form.Field> */}
          </Form>
        </Segment>
        {update ? (
          <Segment attached styleName="style.headingBox">
            <Button
              onClick={e => this.handleUpdateDelete(e, "put")}
              color="blue"
            >
              Save Changes
            </Button>
            <Button onClick={e => this.handleUpdateDelete(e, "delete")}>
              Delete
            </Button>
          </Segment>
        ) : (
          <Segment attached styleName="style.buttonBox">
            <Button onClick={this.handleSubmit} color="blue" type="submit">
              Submit
            </Button>
          </Segment>
        )}
      </Segment>
    );
  }
}
