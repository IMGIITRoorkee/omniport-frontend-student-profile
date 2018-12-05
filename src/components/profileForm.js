import React from "react";
import { Form, Input, Button, Icon, Label } from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";
import style from "../stylesheets/interestForm.css";

const initial = {
  update:false,
  data: { handle:'',
          description:'',
          customWebsite:false,
          resume:null
        }
};

export class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: initial.data
    };
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.props != nextProps && nextProps.update == true) {
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
  handleChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ data: { ...this.state.data, [name]: value } });
  };
  handleSubmit = e => {
    let data = new FormData();
    data.append('handle', this.state.data.handle);
    data.append('description', this.state.data.description);
    data.append('resume', this.state.data.resume);

    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    axios({
      method: "post",
      url: "/api/student_profile/profile/",
      data: data,
      headers: headers
    }).then((response)=> {
      this.props.fetchData();
      this.props.appendDate(response.data);
      this.props.handleHide();
      this.setState({
        data: { topic: "", id: -1 },
        update: false
      });
    });

    e.preventDefault();
  };
  handleUpdateDelete = (e, option) => {
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    axios({
      method: option,
      url: "/api/student_profile/profile/",
      data: this.state.data,
      headers: headers
    }).then((response)=> {
      this.props.fetchData();
      this.setState({
        data: { topic: "", id: -1 },
        update: false
      });
      this.props.handleHide();
    });

    e.preventDefault();
  };

  handleFile = (event) =>
  {
      this.setState({
        data:{...this.state.data, resume:event.target.files[0]}
      });

  }

  render() {
    return (
      <div styleName="style.formStyle">
        <div styleName="style.headingBox">
          <span>
            <Icon color="blue" name="stop" />
            <h4 styleName="style.heading">INTERESTS</h4>
          </span>

          <Icon
            bordered
            name="cancel"
            color="black"
            onClick={this.props.handleHide}
          />
        </div>

        <Form styleName="style.form">
          <Form.Field>
            <Form.Input
              fluid
              label="Handle"
              onChange={this.handleChange}
              value={this.state.data.topic}
              name="handle"
              placeholder="Change your handle"
            />
          </Form.Field>
          <Form.Field>
            <Form.TextArea
              fluid
              label="Description"
              onChange={this.handleChange}
              value={this.state.data.topic}
              name="description"
              placeholder="Describe yourself"
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              fluid
              type="file"
              label="Upload your Resume"
              onChange={this.handleFile}
              value={this.state.data.topic}
              name="resume"
              placeholder="Add interest ..."
            />
          </Form.Field>
        </Form>

        {this.props.update ? (
          <div styleName="style.bottomBar">
            <Button onClick={e => this.handleUpdateDelete(e, "delete")}>
              Delete
            </Button>
            <Button primary onClick={e => this.handleUpdateDelete(e, "put")}>
              Save Changes
            </Button>
          </div>
        ) : (
          <div styleName="style.bottomBar">
            <Button primary onClick={this.handleSubmit}>
              Submit
            </Button>
          </div>
        )}
      </div>
    );
  }
}
