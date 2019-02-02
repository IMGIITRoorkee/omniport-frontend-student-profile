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
import YearField from "./input_fields/year-field";

const FieldMap = {
  boolean_field: BooleanField,
  choice_field: ChoiceField,
  date_field: DateField,
  email_field: EmailField,
  integer_field: IntegerField,
  read_field: ReadField,
  input_field: TextField,
  text_area_field: TextAreaField,
  year_field: YearField
};

export default function genericFormMaker(info) {
  let { initial, name, url } = info;
  class Generic extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: props.formData,
        fileData: props.fileData || -1 , //-1 in case of no file input fields present
        update: props.update,
        open: false,
        errors:[]
      };
    }
    makeForm = info => {
      let formElements = [];
      let fields = info.fields;
      for (let index in fields) {
        let field = fields[index];
        //loop through each field

        let props = {};
        let properties = field.user_props;
        for (let index in properties) {
          //loop through each prop
          console.log(properties[index]);
          props[properties[index]] = this[properties[index]];
        }
        props["value"] = this.state.data[field.name];
        //combine user_props and const_props

        props = Object.assign(props, field.const_props);

        //create the JSX element with the props and push it to the form array
        let f = FieldMap[field.type];
        console.log(props);
        formElements.push(React.createElement(f, props));
      }




      let group_fields = info.group_fields;
      for(let i in group_fields)
      {
        let group = group_fields[i];
        let fields = group.fields;
        let groupElements = [];
        for (let index in fields) {
          let field = fields[index];
          //loop through each field
  
          let props = {};
          let properties = field.user_props;
          for (let index in properties) {
            //loop through each prop
            console.log(properties[index]);
            props[properties[index]] = this[properties[index]];
          }
          props["value"] = this.state.data[field.name];
          //combine user_props and const_props
  
          props = Object.assign(props, field.const_props);
  
          //create the JSX element with the props and push it to the form array
          let f = FieldMap[field.type];
          console.log(props);
          groupElements.push(React.createElement(f, props));
        }
        formElements.push(
          <Form.Group key={ i} widths={group.widths}>{groupElements}</Form.Group>
        )
      }


      return formElements;
    };

    handleFile = (event, name) => {
      let link = name + "Link";
      this.setState({
        fileData:{
          ...this.state.fileData,
          [name]: event.target.files[0],
          [link]: event.target.value
      }
      });
      event.target.value = null;
    };

    handleSubmit = e => {
      let data = new FormData();
      let info = this.state.data;
      for(let prop in info)
      {
        data.append(prop, info[prop]);
      }
      if(this.state.fileData !== -1)
      {
      let info = this.state.fileData;
      for(let prop in info)
      {
        let link = prop + "Link";
        if (this.state.fileData[link] != null && this.state.fileData[prop] != null) {
          data.append(prop, this.state.fileData[prop]);
        } else if (this.state.fileData[prop] == null && this.state.fileData[link] != null) {
        } else if (this.state.fileData[prop] == null && this.state.fileData[link] == null) {
          data.append(prop, "");
        }
      }
    }
    
      let headers = {
        "X-CSRFToken": getCookie("csrftoken"),
        "Content-type": "multipart/form-data"
      };
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
        url: "/api/student_profile/" + url +"/" + this.state.data.id + "/",
        data: this.state.data,
        headers: headers
      }).then(response => {
        this.props.updateDeleteData(this.state.data, option);
        this.setState(initial, () => {
          this.props.handleHide();
        });
      });
    };

    handleChange = (name, value) => {
      console.log('called');
      if (this.state.data.hasOwnProperty(name)) {
        console.log('yes');
        this.setState({ data: { ...this.state.data, [name]: value } });
      }
    };

    handleDelete = (name) => {
      let link = name + "link";
      this.setState({
        fileData: {...this.state.fileData, [name]: null, [link]: null}
      });
    };
    render() {
      const {update} = this.state;
      console.log('reached render');
      let formElements = this.makeForm(info);
      return (
        <Segment basic>
          <Segment attached="top" styleName="style.headingBox">
            <h3 styleName="style.heading">{name}</h3>
            <Icon color="grey" name="delete" onClick={this.props.handleHide} />
          </Segment>

          <Segment attached styleName="style.formStyle">
            <ErrorTransition errors={this.state.errors} />
            <Form autoComplete="off">{formElements}</Form>
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
              <Button onClick={() => this.handleUpdateDelete("put")} color="blue">
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


//provision to add a group form object using a different prop;
//user props is currently wrong will be changed after testing
