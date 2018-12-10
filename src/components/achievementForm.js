import React from "react";
import { Form, Input, Button, Icon, Label, Segment } from "semantic-ui-react";
import { DatesRangeInput } from "semantic-ui-calendar-react";
import { getCookie } from "formula_one";
import axios from "axios";
import style from "../stylesheets/bookForm.css";

export const initial = {
  update: false,
  data: { achievement: "", id: -1 }
};
export class AchievementForm extends React.Component {
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

  handleSubmit = e => {
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    axios({
      method: "post",
      url: "/api/student_profile/achievement/",
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
      url: "/api/student_profile/achievement/" + this.state.data.id + "/",
      data: this.state.data,
      headers: headers
    }).then(response => {
      this.props.updateDeleteData(this.state.data, option);
      this.setState({
        data: { achievement: "", id: -1 },
        update: false
      });
      this.props.handleHide();
    });

    e.preventDefault();
  };

  render() {
    const { update } = this.state;
    console.log("form-data", this.state.data);
    console.log("form-update", update);
    return (
      <Segment basic styleName="style.formStyle">
        <Segment attached="top">
          {/* <Icon color="blue" name="stop" /> */}
          <h4>ACHIEVEMENT</h4>
        </Segment>
        {/* <Icon
            bordered
            name="cancel"
            color="black"
            onClick={this.props.handleHide}
          /> */}

        <Segment attached="bottom">
          <Form autoComplete="off">
            <Form.Field required>
              <label>Topic</label>
              <Input
                autoFocus
                onChange={this.handleChange}
                value={this.state.data.achievement}
                name="achievement"
                placeholder="Achievement"
              />
            </Form.Field>
            {update ? (
              <span>
                <Button
                  onClick={e => this.handleUpdateDelete(e, "put")}
                  color="blue"
                >
                  Save Changes
                </Button>
                <Button onClick={e => this.handleUpdateDelete(e, "delete")}>
                  Delete
                </Button>
              </span>
            ) : (
              <Button
                onClick={this.handleSubmit}
                color="blue"
                type="submit"
                disabled={!this.state.data.achievement}
              >
                Submit
              </Button>
            )}
            <Button onClick={this.props.handleHide}>Cancel</Button>
          </Form>
        </Segment>
      </Segment>
    );
  }
}
