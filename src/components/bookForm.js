import React from "react";
import { Form, Input, Button, Icon, Label, Segment } from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";
import { Scrollbars } from "react-custom-scrollbars";

import style from "../stylesheets/bookForm.css";
import { DateInput } from "semantic-ui-calendar-react";

export const initial = {
  update: false,
  data: {
    id: -1,
    title: "",
    authors: "",
    publisher: "",
    year: "",
    pages: "",
    volumes: "",
    contribution: "",
    editors: "",
    isbnCode: "",
    priority: 1,
    visibility: true
  }
};
export class BookForm extends React.Component {
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
      url: "/api/student_profile/book/",
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
      url: "/api/student_profile/book/" + this.state.data.id + "/",
      data: this.state.data,
      headers: headers
    }).then(response => {
      this.props.updateDeleteData(this.state.data, option);
      this.setState(initial);
      this.props.handleHide();
    });

    e.preventDefault();
  };

  render() {
    const { update } = this.state;
    const {
      title,
      authors,
      publisher,
      year,
      pages,
      volumes,
      contribution,
      editors,
      isbnCode
    } = this.state.data;
    return (
      <Segment basic>
        <Segment attached styleName="style.headingBox">
          <h4 styleName="style.heading">BOOK</h4>
          <Icon
            color="grey"
            name="delete"
            size="large"
            onClick={this.props.handleHide}
          />
        </Segment>

        <Segment attached styleName="style.formStyle">
          <Form autoComplete="off">
            <Form.Field required>
              <label>Title</label>
              <Input
                onChange={this.handleChange}
                value={title}
                name="title"
                placeholder="Title"
              />
            </Form.Field>
            <Form.Field required>
              <label>Authors</label>
              <Form.Input
                onChange={this.handleChange}
                value={authors}
                name="authors"
                placeholder="Authors"
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Field required>
                <label>Publisher</label>
                <Form.Input
                  onChange={this.handleChange}
                  value={publisher}
                  name="publisher"
                  placeholder="Publisher"
                />
              </Form.Field>
              <Form.Field required>
                <label>Publication Year</label>
                <Input
                  type="number"
                  onChange={this.handleChange}
                  value={year}
                  name="year"
                  placeholder="Publication Year"
                />
              </Form.Field>
            </Form.Group>
            {/* optional fields */}
            <Form.Group widths="equal">
              <Form.Field>
                <label>Pages</label>
                <Input
                  onChange={this.handleChange}
                  value={pages}
                  name="pages"
                  placeholder="Pages"
                />
              </Form.Field>
              <Form.Field>
                <label>Volumes</label>
                <Input
                  onChange={this.handleChange}
                  value={volumes}
                  name="volumes"
                  placeholder="Volumes"
                />
              </Form.Field>
              <Form.Field>
                <label>Contribution</label>
                <Input
                  onChange={this.handleChange}
                  value={contribution}
                  name="contribution"
                  placeholder="Contribution"
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Editors</label>
                <Input
                  onChange={this.handleChange}
                  value={editors}
                  name="editors"
                  placeholder="Editors"
                />
              </Form.Field>
              <Form.Field>
                <label>ISBN code</label>
                <Input
                  onChange={this.handleChange}
                  value={isbnCode}
                  name="isbnCode"
                  placeholder="ISBN code"
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Segment>

        {update ? (
          <Segment attached styleName="style.headingBox">
            <Button
              onClick={e => this.handleUpdateDelete(e, "put")}
              color="blue"
            >
              Save Changes
            </Button>
            <Button onClick={e => this.handleUpdateDelete(e, "delete")}>
              Delete
            </Button>
          </Segment>
        ) : (
          <Segment attached styleName="style.buttonBox">
            <Button onClick={this.handleSubmit} color="blue" type="submit">
              Submit
            </Button>
          </Segment>
        )}
      </Segment>
    );
  }
}
