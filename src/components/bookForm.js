import React from "react";
import { Form, Input, Button, Icon, Confirm, Segment, Message } from "semantic-ui-react";
import moment from "moment";
import { getCookie } from "formula_one";
import axios from "axios";
import { Scrollbars } from "react-custom-scrollbars";

import style from "../styles.css";
import { YearInput } from "semantic-ui-calendar-react";
import { ErrorTransition } from "./transition";

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
    visibility: true,
    book:"",
    bookLink:"",
    links:[]
  }
};
export class BookForm extends React.Component {
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
    axios({
      method: "post",
      url: "/api/student_profile/book/",
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
      url: "/api/student_profile/book/" + this.state.data.id + "/",
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
    const { title, authors, publisher, year, isbnCode } = this.state.data;
    if (title == "") {
      errors.push("Title must be filled");
    }
    if (authors == "") {
      errors.push("Authors must be filled");
    }
    if (publisher == "") {
      errors.push("Publisher must be filled");
    }
    if (year == "") {
      errors.push("Year must be filled");
    } else if (!moment(year, "YYYY", true).isValid()) {
      errors.push("Please enter year in YYYY format");
    }
    if (isNaN(isbnCode)) {
      errors.push("Please enter valid ISBN code");
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
    const { title, authors, publisher, year, pages, volumes, contribution, editors, isbnCode } = this.state.data;
    return (
      <Segment basic>
        <Segment attached="top" styleName="style.headingBox">
          <h3 styleName="style.heading">Book</h3>
          <Icon color="grey" name="delete" onClick={this.props.handleHide} />
        </Segment>

        <Segment attached styleName="style.formStyle">
          <ErrorTransition errors={this.state.errors} />
          <Form autoComplete="off">
            <Form.Field required>
              <label>Title</label>
              <Input autoFocus onChange={this.handleChange} value={title} name="title" placeholder="Title" />
            </Form.Field>
            <Form.Field required>
              <label>Authors</label>
              <Form.Input onChange={this.handleChange} value={authors} name="authors" placeholder="Authors" />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Field required>
                <label>Publisher</label>
                <Form.Input onChange={this.handleChange} value={publisher} name="publisher" placeholder="Publisher" />
              </Form.Field>
              <YearInput
                label="Year"
                name="year"
                placeholder="Year"
                value={`${year}`}
                iconPosition="left"
                onChange={this.handleChange}
              />
            </Form.Group>
            {/* optional fields */}
            <Form.Group widths="equal">
              <Form.Field>
                <label>Pages</label>
                <Input onChange={this.handleChange} value={pages} name="pages" placeholder="Pages" />
              </Form.Field>
              <Form.Field>
                <label>Volumes</label>
                <Input onChange={this.handleChange} value={volumes} name="volumes" placeholder="Volumes" />
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
                <Input onChange={this.handleChange} value={editors} name="editors" placeholder="Editors" />
              </Form.Field>
              <Form.Field>
                <label>ISBN code</label>
                <Input onChange={this.handleChange} value={isbnCode} name="isbnCode" placeholder="ISBN code" />
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
