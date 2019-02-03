import React from "react";

import moment from "moment";

import axios from "axios";

import { Form, Input, Button, Icon, Checkbox, Segment, Confirm } from "semantic-ui-react";

import {capitalizeFirstLetter} from "./../utils";

import { getCookie } from "formula_one";

import style from "../styles.css";

import { ErrorTransition } from "./transition";

import {FieldMap} from "./../constants";

export default function genericFormMaker(info) {
  let { initial, name, url } = info;
  class Generic extends React.Component {
    constructor(props) {
      super(props); 
      this.state = {
        data: props.formData,
        update: props.update,
        open: false,
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
        if (this.state.update) {
          this.handleSubmit("put");
        } else {
          this.handleSubmit();
        }
      }
    };
    makeForm = info => {
      let formElements = [];
      let fields = info.fields;
      for (let index in fields) {
        let field = fields[index];
        if(field.group == false)
        {
          //loop through each field

        let props = {};
        let properties = field.user_props;
        for (let index in properties) {
          //loop through each prop
          props[properties[index]] = this[properties[index]];
        }
        props["autoFocus"] = index == 0 ? true:false;
        if (field.type != "file_field") {
          props["value"] = this.state.data[field.name];
        } else {
          props["link"] = this.state.data[field.name + "Link"];
        }
        //combine user_props and const_props

        props = Object.assign(props, field.const_props);
        //create the JSX element with the props and push it to the form array
        let f = FieldMap[field.type];
        formElements.push(React.createElement(f, props));
      }
      else{
        let fields = field.fields;
          let groupElements = [];
          for (let i in fields) {
            let field = fields[i];
            //loop through each field
  
            let props = {};
            let properties = field.user_props;
            for (let index in properties) {
              //loop through each prop
              props[properties[index]] = this[properties[index]];
            }
            props["autoFocus"] = index == 0  && i == 0 ? true:false;
            if (field.type != "file_field") {
              props["value"] = this.state.data[field.name];
            } else {
              props["link"] = this.state.data[field.name + "Link"];
            }
            //combine user_props and const_props
  
          props = Object.assign(props, field.const_props);
  
            //create the JSX element with the props and push it to the form array
            let f = FieldMap[field.type];
            groupElements.push(React.createElement(f, props));
          }
          formElements.push(
            <Form.Group key = {index} widths={field.widths}>
              {groupElements}
            </Form.Group>
          );
        
      }
      }


      

      return formElements;
    };

    handleFile = (event, file, value, name) => {
      let link = name + "Link";
      this.setState({
        data: {
          ...this.state.data,
          [name]: file,
          [link]: value
        }
      });
      event.target.value = "";
    };

    handleSubmit = option => {
      let data = new FormData();
      let info = this.state.data;
      for (let prop in info) {
        let link = prop + "Link";
        if (this.state.data.hasOwnProperty(link) === false) {
          data.append(prop, info[prop]);
        } else {
          if (this.state.data[link] != null && this.state.data[prop] != null) {
            data.append(prop, this.state.data[prop]);
          } else if (
            this.state.data[prop] == null &&
            this.state.data[link] != null
          ) {
          } else if (
            this.state.data[prop] == null &&
            this.state.data[link] == null
          ) {
            data.append(prop, "");
          }
        }
      }
      let headers = {
        "X-CSRFToken": getCookie("csrftoken"),
        "Content-type": "multipart/form-data"
      };
      if (this.state.update === false) {
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
            this.handleErrors(error.response.data);
          });
      } else {
        axios({
          method: option,
          url: "/api/student_profile/" + url + "/" + this.state.data.id + "/",
          data: data,
          headers: headers
        })
          .then(response => {
            this.props.updateDeleteData(response.data, option);
            this.setState(initial, () => {
              this.props.handleHide();
            });
          })
          .catch(error => {
            this.handleErrors(error.response.data);
          });
      }
    };

    handleUpdateDelete = option => {
      let headers = {
        "X-CSRFToken": getCookie("csrftoken")
      };
      axios({
        method: option,
        url: "/api/student_profile/" + url + "/" + this.state.data.id + "/",
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
      if (this.state.data.hasOwnProperty(name)) {
        this.setState({ data: { ...this.state.data, [name]: value } });
      }
    };

    handleDelete = name => {
      let link = name + "Link";
      this.setState(
        {
          data: { ...this.state.data, [name]: null, [link]: null }
        }
      );
    };
    handleErrors = error_dict => {
      let dict = error_dict;
      let errors = [];
      for (let key in dict) {
        for (let index in dict[key]) {
          errors.push(capitalizeFirstLetter(key) + ": " + dict[key][index]);
        }
      }
      this.setState({ errors: errors });
    };
    render() {
      const { update } = this.state;
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
              onConfirm={() => this.handleSubmit("delete")}
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
              <Button onClick={() => this.handleSubmit("put")} color="blue">
                Save Changes
              </Button>
            </Segment>
          ) : (
            <Segment attached="bottom" styleName="style.buttonBox">
              <Button
                onClick={() => this.handleSubmit()}
                color="blue"
                type="submit"
              >
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
