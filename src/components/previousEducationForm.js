import React from "react";
import {
  Form,
  Input,
  Button,
  Icon,
  Label,
  Segment,
  Dropdown,
  Message
} from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";
import moment from "moment";

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
      update: this.props.update,
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
    if (e.keyCode === 13) {
      this.handleErrors();
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
      this.setState(initial, () => {
        this.props.handleHide();
      });
    });
  };
  handleUpdateDelete = option => {
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
      this.setState(initial, () => {
        this.props.handleHide();
      });
    });
  };
  handleErrors = () => {
    console.log(this.state.data);
    let errors = [];
    const { institute, degree, subject, cgpa, year } = this.state.data;
    if (institute == "") {
      errors.push("Institute must be filled");
    }
    if (degree == "") {
      errors.push("Degree must be filled");
    }
    if (subject == "") {
      errors.push("Subject must be filled");
    }
    if (cgpa == "") {
      errors.push("CGPA must be filled");
    } else if (
      isNaN(parseInt(cgpa)) ||
      parseFloat(cgpa) > 10 ||
      parseFloat(cgpa) < 0
    ) {
      errors.push("Please enter valid CGPA");
    }
    if (year == "") {
      errors.push("Year must be filled");
    } else if (!moment(year, "YYYY", true).isValid()) {
      errors.push("Please enter year in YYYY format");
    }
    if (errors.length > 0) {
      this.setState({ errors: errors });
    } else {
      this.setState({ errors: [] }, () => {
        if (this.state.update == false) this.handleSubmit();
        else this.handleUpdateDelete("put");
      });
    }
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
          {this.state.errors.length > 0 ? (
            <Message
              error
              header="There were some errors with your submission:"
              list={this.state.errors}
            />
          ) : null}
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
              popupPosition="bottom left"
              label="Year"
              name="year"
              placeholder="Year"
              value={year}
              iconPosition="left"
              onChange={this.handleChange}
            />
          </Form>
        </Segment>
        {update ? (
          <Segment attached styleName="style.headingBox">
            <Button onClick={this.handleErrors} color="blue">
              Save Changes
            </Button>
            <Button onClick={() => this.handleUpdateDelete("delete")}>
              Delete
            </Button>
          </Segment>
        ) : (
          <Segment attached styleName="style.buttonBox">
            <Button onClick={this.handleErrors} color="blue" type="submit">
              Submit
            </Button>
          </Segment>
        )}
      </Segment>
    );
  }
}
