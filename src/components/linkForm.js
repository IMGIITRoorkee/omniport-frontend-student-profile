import React from "react";
import {
  Form,
  Input,
  Button,
  Icon,
  Label,
  Dropdown,
  Segment
} from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";
import style from "../stylesheets/interestForm.css";
import { LinkList } from "./linkList";

const initial = {
  data: { site: "git", url: "" }
};
const options = [
  { key: "Github", text: "Github", value: "git" },
  { key: "Facebook", text: "Facebook", value: "fac" },
  { key: "LinkedIn", text: "LinkedIn", value: "lin" },
  { key: "Other Website", text: "Other Website", value: "oth" }
];
export class LinkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: initial.data,
      links: Array.from(props.data)
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
      this.handleHide();
    }
  };

  onChange = (event, data) => {
    const { value } = data;
    this.setState({ data: { ...this.state.data, site: value } });
  };
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
      url: "/api/student_profile/social_link/",
      data: this.state.data,
      headers: headers
    }).then(response => {
      var arr = this.state.links;
      arr.push(response.data);
      this.setState({ links: arr, data: initial.data });
    });
  };

  handleHide = () => {
    this.props.handleUpdate(this.state.links);
  };
  handleUpdateDelete = id => {
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };

    axios({
      method: "delete",
      url: "/api/student_profile/social_link/" + id + "/",
      headers: headers
    }).then(response => {
      console.log(this.state.links);
      this.setState({
        data: initial.data,
        links: this.state.links.filter(obj => (obj.id != id ? true : false))
      });
    });
  };

  render() {
    return (
      <div>
        <Segment attached styleName="style.headingBox">
          <span>
            <Icon color="blue" name="stop" />
            <h4 styleName="style.heading">SOCIAL MEDIA LINKS</h4>
          </span>

          <Icon
            bordered
            name="cancel"
            color="black"
            onClick={this.handleHide}
          />
        </Segment>
        <Segment attached>
          <Form>
            <Form.Group inline>
              <Form.Field>
                <label>Site</label>
                <Dropdown
                  selection
                  value={this.state.data.site}
                  name="site"
                  onChange={this.onChange}
                  options={options}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="URL"
                  onChange={this.handleChange}
                  value={this.state.data.url}
                  name="url"
                  placeholder="Add interest ..."
                />
              </Form.Field>
              <Form.Field />
              <Icon
                name="add"
                onClick={this.handleSubmit}
                style={{ color: "black" }}
              />
            </Form.Group>
          </Form>
          <LinkList
            data={this.state.links}
            handleUpdateDelete={this.handleUpdateDelete}
          />
        </Segment>
      </div>
    );
  }
}
