import React from "react";
import {
  Form,
  Input,
  Button,
  Icon,
  Label,
  Segment,
  Message
} from "semantic-ui-react";
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
      url: "/api/student_profile/achievement/",
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
  };
  handleErrors = () => {
    let errors = [];
    const { achievement } = this.state.data;
    if (achievement == "") {
      errors.push("Achievement must be filled");
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
    console.log("form-data", this.state.data);
    console.log("form-update", update);
    return (
      <Segment basic>
        <Segment attached styleName="style.headingBox">
          <h4 styleName="style.heading">ACHIEVEMENT</h4>
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
            <Form.Field>
              <label>Achievement</label>
              <Input
                autoFocus
                onChange={this.handleChange}
                value={this.state.data.achievement}
                name="achievement"
                placeholder="Achievement"
              />
            </Form.Field>
          </Form>
        </Segment>

        {update ? (
          <Segment attached styleName="style.headingBox">
            <Button onClick={() => this.handleUpdateDelete("put")} color="blue">
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
