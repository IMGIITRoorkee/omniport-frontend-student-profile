import React from "react";
import { Form, Input, Button, Icon, Confirm, Segment, Message } from "semantic-ui-react";
import { DatesRangeInput } from "semantic-ui-calendar-react";
import { getCookie } from "formula_one";
import axios from "axios";
import style from "../styles.css";
import { ErrorTransition } from "./transition";

export const initial = {
  update: false,
  data: { topic: "", id: -1 },
  links:[]
};
export class InterestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.formData,
      update: this.props.update,
      list: null,
      errors: [],
      open: false
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
    if (this.props != nextProps && nextProps.update != false) {
      this.setState({
        data: nextProps.formData,
        update: nextProps.update
      });
    } else if (this.props != nextProps && nextProps.update == false) {
      this.setState(initial);
    }
  }
  handleChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ data: { ...this.state.data, [name]: value } });
  };

  handleSubmit = () => {
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    axios({
      method: "post",
      url: "/api/student_profile/interest/",
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
      url: "/api/student_profile/interest/" + this.state.data.id + "/",
      data: this.state.data,
      headers: headers
    }).then(response => {
      this.props.updateDeleteData(this.state.data, option);
      this.setState(
        {
          data: { topic: "", id: -1 },
          update: false
        },
        () => {
          this.props.handleHide();
        }
      );
    });
  };
  handleErrors = () => {
    let errors = [];
    const { topic } = this.state.data;
    if (topic == "") {
      errors.push("Topic must be filled");
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
    return (
      <Segment basic>
        <Segment attached="top" styleName="style.headingBox">
          <h3 styleName="style.heading">Interest</h3>
          <Icon color="grey" name="delete" onClick={this.props.handleHide} />
        </Segment>
        <Segment attached styleName="style.formStyle">
          <ErrorTransition errors={this.state.errors} />
          <Form autoComplete="off">
            <Form.Field>
              <label>Topic</label>
              <Input
                autoFocus
                onChange={this.handleChange}
                value={this.state.data.topic}
                name="topic"
                placeholder="Topic"
              />
            </Form.Field>
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
            <Button color="blue" onClick={this.handleErrors} type="submit">
              Submit
            </Button>
          </Segment>
        )}
      </Segment>
    );
  }
}
