import React from "react";
import moment from "moment";
import { Form, Input, Button, Icon, Checkbox, Segment, Confirm } from "semantic-ui-react";
import { getCookie } from "formula_one";
import axios from "axios";
import style from "../styles.css";
import { DateInput } from "semantic-ui-calendar-react";
import { ErrorTransition } from "./transition";
import BooleanField from "./input_fields/boolean-field";
import ChoiceField from "./input_fields/choice-field";
import DateField from "./input_fields/date-field";
import EmailField from "./input_fields/email-field";
import IntegerField from "./input_fields/integer-field";
import ReadField from "./input_fields/read-field";
import TextField from "./input_fields/text-field";
import TextAreaField from "./input_fields/textarea-field";

const FieldMap = {
  boolean_field: BooleanField,
  choice_field: ChoiceField,
  date_field: DateField,
  email_field: EmailField,
  integer_field: IntegerField,
  read_field: ReadField,
  input_field: TextField,
  text_area_field: TextAreaField
};

export default function genericFormMaker(info) {
  let { initial, name, url } = info;
  console.log(info);
  class Generic extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: props.formData,
        update: props.update,
        open: false
      };
    }
    makeForm = fields => {
      let formElements = [];
      console.log(fields);
      for (field in fields) {
        //loop through each field

        let props = {};
        for (let prop in field.user_props) {
          //loop through each prop

          props[prop] = this[prop];
        }
        props["value"] = this.state.data[field.name];
        //combine user_props and const_props

        props = Object.assign(props, field.const_props);

        //create the JSX element with the props and push it to the form array

        formElements.push(React.createElement(FieldMap[field.name], props));
      }
      return formElements;
    };

    handleSubmit = e => {
      let headers = {
        "X-CSRFToken": getCookie("csrftoken")
      };
      let data = this.state.data;
      axios({
        method: "post",
        url: "/api/student_profile/" + url + "/",
        data: data,
        headers: headers
      })
        .then(response => {
          this.props.appendData(response.data);
          this.setState(initial, () => {
            this.props.handleHide();
          });
        })
        .catch(error => {
          console.log(error);
        });
    };

    handleUpdateDelete = option => {
      let headers = {
        "X-CSRFToken": getCookie("csrftoken")
      };
      axios({
        method: option,
        url: "/api/student_profile/" + url + this.state.data.id + "/",
        data: this.state.data,
        headers: headers
      }).then(response => {
        this.props.updateDeleteData(this.state.data, option);
        this.setState(initial, () => {
          this.props.handleHide();
        });
      });
    };

    onChange = (event, { name = undefined, value }) => {
      event.persist();
      if (this.state.data.hasOwnProperty(name)) {
        this.setState({ data: { ...this.state.data, [name]: value } });
      }
    };

    render() {
      let formElements = this.makeForm(info.fields);
      return (
        <Segment basic>
          <Segment attached="top" styleName="style.headingBox">
            <h3 styleName="style.heading">{name}</h3>
            <Icon color="grey" name="delete" onClick={this.props.handleHide} />
          </Segment>

          <Segment attached styleName="style.formStyle">
            <ErrorTransition errors={this.state.errors} />
            <Form autocomplete="off">{formElements}</Form>
            <Confirm
              header="Delete"
              open={this.state.open}
              content="Are you sure you want to delete?"
              onConfirm={() => this.handleUpdateDelete("delete")}
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
              <Button onClick={() => this.handleUpdateDelete("update")} color="blue">
                Save Changes
              </Button>
            </Segment>
          ) : (
            <Segment attached="bottom" styleName="style.buttonBox">
              <Button onClick={() => this.handleSubmit()} color="blue" type="submit">
                Submit
              </Button>
            </Segment>
          )}
        </Segment>
      );
    }
  }
  return Generic;
}

const bookSpec = {
  fields: {
    field1: {
      name: "Title",
      type: "input_field",
      const_props: {
        name: "Title",
        placeholder: "Enter the title of the book"
      },
      user_props: ["onChange"]
    },
    field2: {
      name: "Author",
      type: "input_field",
      const_props: {
        name: "Author",
        placeholder: "Enter the authors of the book"
      },
      user_props: ["onChange"]
    }
  },
  group_fields: {},

  initial: {
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
  },
  url: "book"
};

//provision to add a group form object using a different prop;
//user props is currently wrong will be changed after testing
