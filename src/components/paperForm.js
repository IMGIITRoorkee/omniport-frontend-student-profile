import React from "react";
import { Form, Input, Button, Icon, Label, Segment, Message } from "semantic-ui-react";
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
    priority: 1,
    visibility: true,
    journal: "",
    title: "",
    authors: "",
    publisher: "",
    year: "",
    pages: "",
    volumes: ""
  }
};
export class PaperForm extends React.Component {
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
      url: "/api/student_profile/paper/",
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
      url: "/api/student_profile/paper/" + this.state.data.id + "/",
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
    console.log(this.state.data);
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
    const { title, authors, publisher, year, pages, volumes, journal } = this.state.data;
    var res = (
      <Form.Field>
        <input type="file" onChange={this.handleFile} styleName="style.inputfile" id="embedpollfileinput" />
        <div styleName="style.inputLabel">
          <label htmlFor="embedpollfileinput" className="ui blue button">
            <i className="ui upload icon" />
            Upload Paper
          </label>
        </div>
      </Form.Field>
    );

    if (this.state.resumeLink) {
      res = (
        <Form.Field>
          <Resume resume={this.state.resumeLink} handleDelete={this.handleDelete} />
        </Form.Field>
      );
    }
    return (
      <Segment basic>
        <Segment attached="top" styleName="style.headingBox">
          <h3 styleName="style.heading">Paper</h3>
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
              <label>Journal</label>
              <Input onChange={this.handleChange} value={journal} name="journal" placeholder="Journal" />
            </Form.Field>
            <Form.Field required>
              <label>Authors</label>
              <Form.Input onChange={this.handleChange} value={authors} name="authors" placeholder="Authors" />
            </Form.Field>
            <Form.Field required>
              <label>Publisher</label>
              <Form.Input onChange={this.handleChange} value={publisher} name="publisher" placeholder="Publisher" />
            </Form.Field>
            <YearInput
              label="Year"
              name="year"
              placeholder="Year"
              value={year}
              iconPosition="left"
              onChange={this.handleChange}
            />
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
            </Form.Group>
          </Form>
        </Segment>

        {update ? (
          <Segment attached="bottom" styleName="style.headingBox">
            <Button onClick={this.handleErrors} color="blue">
              Save Changes
            </Button>
            <Button color="red" onClick={() => this.handleUpdateDelete("delete")}>
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
