import React from "react";
import { Form, Input, Button, Icon, Label, Segment, Confirm, Message } from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";

import style from "../styles.css";
import { YearInput } from "semantic-ui-calendar-react";
import { ErrorTransition } from "./transition";


export const initial = {
  update: false,
  data: {
    semester_number: "",
    cgpa: "",
    sgpa: "",
    priority: 1,
    visibility: true
  }
};
export class CurrentEducationForm extends React.Component {
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
  handleSubmit = () => {
    let headers = {
      "X-CSRFToken": getCookie("csrftoken"),
      "Content-type": "multipart/form-data"
    }
    let data = new FormData();
    data.append("semester_number", 10);
    data.append("cgpa", 10);
    data.append("sgpa", 1);

    axios({
      method: "post",
      url: "/api/student_profile/current_education/",
      data: data,
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
      url: "/api/student_profile/current_education/" + this.state.data.id + "/",
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
    let errors = [];
    const { semesterNumber, sgpa, cgpa } = this.state.data;
    if (semesterNumber == "") {
      errors.push("Semester number must be filled");
    } else if (isNaN(parseInt(semesterNumber)) || parseInt(semesterNumber) > 10 || parseInt(semesterNumber) < 1) {
      errors.push("Please enter a valid semester number");
    }
    if (cgpa == "") {
      errors.push("CGPA must be filled");
    } else if (isNaN(cgpa) || parseFloat(cgpa) > 10 || parseFloat(cgpa) < 0) {
      errors.push("Please enter valid CGPA");
    }
    if (sgpa == "") {
      errors.push("SGPA must be filled");
    } else if (isNaN(sgpa) || parseFloat(sgpa) > 10 || parseFloat(sgpa) < 0) {
      errors.push("Please enter valid SGPA");
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
    const { semesterNumber, sgpa, cgpa } = this.state.data;
    return (
      <Segment basic>
        <Segment attached="top" styleName="style.headingBox">
          <h3 styleName="style.heading">Current education</h3>
          <Icon color="grey" name="delete" onClick={this.props.handleHide} />
        </Segment>

        <Segment attached styleName="style.formStyle">
          <ErrorTransition errors={this.state.errors} />
          <Form autoComplete="off">
            <Form.Group widths="equal">
              <Form.Field required>
                <label>Semester number</label>
                <Form.Input
                  autoFocus
                  onChange={this.handleChange}
                  value={semesterNumber}
                  name="semesterNumber"
                  placeholder="Semester number"
                />
              </Form.Field>
              <Form.Field required>
                <label>CGPA</label>
                <Form.Input onChange={this.handleChange} value={cgpa} name="cgpa" placeholder="CGPA" />
              </Form.Field>
              <Form.Field required>
                <label>SGPA</label>
                <Form.Input onChange={this.handleChange} value={sgpa} name="sgpa" placeholder="SGPA" />
              </Form.Field>
            </Form.Group>
          </Form>
          <Confirm
            header="Delete"
            open={this.state.open}
            content="Are you sure you want to delete?"
            onConfirm={() => {
              this.handleUpdateDelete("delete");
            }}
            onCancel={() => {
              this.setState({ open: false });
            }}
          />
        </Segment>
        {update ? (
          <Segment attached="bottom" styleName="style.headingBox">
            <div
              styleName="style.delete"
              onClick={() => {
                this.setState({ open: true });
              }}
            >
              Delete
            </div>
            <Button onClick={this.handleErrors} color="blue">
              Save Changes
            </Button>
          </Segment>
        ) : (
          <Segment attached="bottom" styleName="style.buttonBox">
            <Button onClick={this.handleErrors} color="blue" type="submit">
              Submit
            </Button>
          </Segment>
        )}
      </Segment>
    );
  }
}
