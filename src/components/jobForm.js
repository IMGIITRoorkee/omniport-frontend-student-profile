import React from "react";
import moment from "moment";
import {
  Form,
  Input,
  Button,
  Icon,
  Checkbox,
  Segment,
  Message
} from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";
import style from "../styles.css";
import { DateInput } from "semantic-ui-calendar-react";
import { ErrorTransition } from "./transition";

export const initial = {
  update: false,
  data: {
    id: -1,
    startDate: "",
    endDate: "",
    isFullDate: true,
    position: "",
    organisation: "",
    description: "",
    priority: 1,
    visibility: true,
    experienceType: "job"
  }
};
export class JobForm extends React.Component {
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
    var data = this.state.data;
    if (data.endDate == "") data.endDate = null;
    axios({
      method: "post",
      url: "/api/student_profile/experience/",
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
    var data = this.state.data;
    if (data.endDate == "") data.endDate = null;
    axios({
      method: option,
      url: "/api/student_profile/experience/" + this.state.data.id + "/",
      data: data,
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
    const {
      position,
      organisation,
      startDate,
      endDate,
      description
    } = this.state.data;
    if (position == "") {
      errors.push("Position must be filled");
    }
    if (organisation == "") {
      errors.push("Organisation must be filled");
    }
    if (startDate != "") {
      if (moment(startDate, "YYYY-MM-DD", true).isValid()) {
        if (
          endDate != "" &&
          endDate != null &&
          moment(endDate, "YYYY-MM-DD", true).isValid()
        ) {
          if (moment(endDate).isBefore(startDate)) {
            errors.push("Start date must be before end date");
          }
        } else {
          if (endDate != "" && endDate != null) {
            errors.push("End date must be of the YYYY-MM-DD format");
          }
        }
      } else {
        errors.push("Start date must be of the YYYY-MM-DD format");
      }
    } else {
      errors.push("Start date must be filled");
    }
    if (description == "") {
      errors.push("Description must be filled");
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
  handleToggle = () => {
    const value = !this.state.data.isFullDate;
    this.setState({ data: { ...this.state.data, isFullDate: value } }, () => {
      console.log(this.state.data.isFullDate);
    });
  };
  render() {
    const { update } = this.state;
    const {
      position,
      organisation,
      startDate,
      endDate,
      isFullDate,
      description
    } = this.state.data;
    return (
      <Segment basic>
        <Segment attached="top" styleName="style.headingBox">
          <h3 styleName="style.heading">Job</h3>
          <Icon color="grey" name="delete" onClick={this.props.handleHide} />
        </Segment>
        <Segment attached styleName="style.formStyle">
          <ErrorTransition errors={this.state.errors} />
          <Form autoComplete="off">
            <Form.Field>
              <label>Position</label>
              <Input
                onChange={this.handleChange}
                value={position}
                name="position"
                placeholder="Position"
                autoFocus
              />
            </Form.Field>
            <Form.Field>
              <label>Organisation</label>
              <Input
                onChange={this.handleChange}
                value={organisation}
                name="organisation"
                placeholder="Organisation"
              />
            </Form.Field>

            <Form.Group widths="equal">
              <DateInput
                dateFormat="YYYY-MM-DD"
                label="Start Date"
                name="startDate"
                placeholder="Start Date [YYYY-MM-DD]"
                value={startDate}
                iconPosition="left"
                onChange={this.handleChange}
              />
              <DateInput
                dateFormat="YYYY-MM-DD"
                label="End Date"
                name="endDate"
                placeholder="End Date [YYYY-MM-DD]"
                value={endDate}
                iconPosition="left"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Field>
              <Checkbox
                label="I remember the exact date"
                onChange={this.handleToggle}
                checked={isFullDate}
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <Form.TextArea
                onChange={this.handleChange}
                value={description}
                name="description"
                placeholder="Description"
              />
            </Form.Field>
          </Form>
        </Segment>
        {update ? (
          <Segment attached="bottom" styleName="style.headingBox">
            <Button onClick={this.handleErrors} color="blue">
              Save Changes
            </Button>
            <Button
              color="red"
              onClick={() => this.handleUpdateDelete("delete")}
            >
              Delete
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