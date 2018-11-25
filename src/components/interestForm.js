import React from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";
export class InterestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { topic: "", id: -1 }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ data: { ...this.state.data, [name]: value } });
  }
  handleSubmit(event) {
    console.log(this.state.data);
    let self = this;
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    console.log(this.state.data);
    axios({
      method: "post",
      url: "/api/student_profile/interest/",
      data: this.state.data,
      headers: headers
    }).then(function(response) {
      self.props.fetchData();
      self.props.handleHide();
      this.setState({
        data: { topic: "", id: -1 },
        update: false
      });
    });

    event.preventDefault();
  }
  handleUpdateDelete = (e, option) => {
    console.log(this.state.data);
    let self = this;
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    console.log(this.state.data);
    axios({
      method: option,
      url: "/api/student_profile/interest/" + this.state.data.id + "/",
      data: this.state.data,
      headers: headers
    }).then(function(response) {
      console.log(response);
      self.props.fetchData();
      self.setState({
        data: { topic: "", id: -1 },
        update: false
      });
      self.props.handleHide();
    });

    e.preventDefault();
  };

  componentWillUpdate(nextProps, nextState) {
    if (this.props != nextProps && nextProps.update == true) {
      console.log(nextProps);
      this.setState({
        data: nextProps.formData,
        update: nextProps.update
      });
    } else if (this.props != nextProps && nextProps.update == false) {
      this.setState({
        data: { topic: "", id: -1 },
        update: false
      });
    }
  }
  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Topic</label>
            <Input
              onChange={this.handleChange}
              value={this.state.data.topic}
              name="topic"
              placeholder="Add interest ..."
            />
          </Form.Field>
          {this.props.update ? (
            <span>
              <Button onClick={e => this.handleUpdateDelete(e, "put")}>
                Save Changes
              </Button>
              <Button onClick={e => this.handleUpdateDelete(e, "delete")}>
                Delete
              </Button>
            </span>
          ) : (
            <Button onClick={this.handleSubmit}>Submit</Button>
          )}
          <Button onClick={this.props.handleHide}>Cancel (close dimmer)</Button>
        </Form>
      </div>
    );
  }
}
