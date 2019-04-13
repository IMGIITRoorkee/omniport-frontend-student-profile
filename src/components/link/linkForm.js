import React from "react";
import { Form, Input, Button, Icon, Message, Dropdown, Segment } from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";
import style from "../../styles.css";
import { LinkList } from "./linkList";
import { ErrorTransition } from "../transition";

const initial = {
  data: { site: "git", url: "" }
};

export class LinkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: initial.data,
      links: props.data,
      errors: [],
      list: null
    };
  }
  componentDidMount() {
    console.log("prop", this.props.options);
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
      this.setState({
        data: initial.data,
        links: this.state.links.filter(obj => (obj.id != id ? true : false))
      });
    });
  };
  handleErrors = () => {
    let errors = [];
    const { url } = this.state.data;
    let re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (!re.test(url)) {
      errors.push("Enter a valid URL");
    }
    if (errors.length > 0) {
      this.setState({ errors: errors });
    } else {
      this.setState({ errors: [] }, () => {
        this.handleSubmit();
      });
    }
  };
  render() {
    return (
      <Segment basic styleName="style.linkBox">
        <Segment attached="top" styleName="style.headingBox">
          <span>
            <Icon color="blue" name="stop" />
            <h3 styleName="style.heading">Social media links</h3>
          </span>

          <Icon name="cancel" color="black" onClick={this.handleHide} />
        </Segment>
        <Segment textAlign="left" attached="bottom" styleName="style.linkForm">
          <ErrorTransition errors={this.state.errors} />
          <Form>
            <Form.Field>
              <label>Site</label>
              <Dropdown
                selection
                value={this.state.data.site}
                name="site"
                onChange={this.onChange}
                options={this.props.options}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="URL"
                onChange={this.handleChange}
                value={this.state.data.url}
                name="url"
                placeholder="Add URL ..."
              />
            </Form.Field>

            <Form.Field>
              <Button color="blue" onClick={this.handleErrors}>
                Add
              </Button>
            </Form.Field>
          </Form>

          <LinkList data={this.state.links} handleUpdateDelete={this.handleUpdateDelete} />
        </Segment>
      </Segment>
    );
  }
}
