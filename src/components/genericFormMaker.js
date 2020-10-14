import React from "react";
import { Form, Button, Icon, Segment, Confirm } from "semantic-ui-react";
import { snakeCase, startCase } from "lodash";
import axios from "axios";

import { getCookie } from "formula_one";

import { ErrorTransition } from "./transition";
import { FieldMap } from "./../constants/input";
import { headers } from "../constants/formPostRequestHeaders";
import commonSpecs from "../constants/commonSpecs";
import style from "../styles.css";

export default function genericFormMaker(info) {
  let { initial, name, url, fields} = info; // creating a closure for the necessary attributes

  class Generic extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: props.update ? props.formData : props.formData.data,
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
        this.props.handleHide(this.props.componentName);
      }
      if (e.keyCode === 13) {
        if (this.state.update) {
          this.handleSubmit("put");
        } else {
          this.handleSubmit("delete");
        }
      }
    };
    makeForm = () => {
      let formElements = [];
      let set = new Set(fields);
      for (let index in commonSpecs) {
        set.add(commonSpecs[index]);
      }
      fields = [...set];
      for (let index in fields) {
        let field = fields[index];
        if (field.group == false) {
          //loop through each field

          let props = {};
          let properties = field.user_props;
          for (let index in properties) { // loop through each property for every field
            props[properties[index]] = this[properties[index]]; // attach the different functions which are passed as call backs
          }
          props["autoFocus"] = index == 0 ? true : false; // to put the focus on the first field of the form
          if (field.type != "file_field") {
            props["value"] = this.state.data[field.name];
          } else {
            props["link"] = this.state.data[field.name + "Link"];
          }
          // combine user_props and const_props
          props = {...props, ...field.const_props}; // combine the constant properties and the form properties
          props["disabled"]=this.state.data.verified;
          if(field.const_props.key == "Description"){
            props["disabled"]=false
          }
          let elementClass = FieldMap[field.type];
          let element = elementClass(props);
          formElements.push(element);
	
        } else {
          let field_arr = field.fields;
          let groupElements = [];
          for (let i in field_arr) { // in case of a group field, loop through each field separately
            let field = field_arr[i];
            let props = {}; // create an object for setting the field element's properties
            let properties = field.user_props;
            for (let index in properties) { // loop through each property
              props[properties[index]] = this[properties[index]];
            }
            props["autoFocus"] = index == 0 && i == 0 ? true : false; // in case of group field, auto focus should be there only for first field of first group.
            if (field.type != "file_field") {
              props["value"] = this.state.data[field.name];
            } else {
              props["link"] = this.state.data[field.name + "Link"];
            }
            props = { ...props, ...field.const_props}; // combine form properties and constant properties
            props["disabled"]=this.state.data.verified;
            if(field.const_props.key == "Description"){
              props["disabled"]=false
            }
            let elementClass = FieldMap[field.type];
            let element = elementClass(props);
            groupElements.push(element);
          }
          // push the fields to form a single group field element
          formElements.push(
            <Form.Group key={index} widths={field.widths}>
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
      // loop through each field which is to be sent in the request
      let data = new FormData();
      let info = this.state.data;
      for (let prop in info) {
        let link = prop + "Link"
        if (info.hasOwnProperty(link) === false) {
          let val = info[prop];
          if(info[prop] == null) val = "";
          data.append(snakeCase(prop), val);
        } else {
          if (info[link] != null && info[prop] != null) {
            data.append(snakeCase(prop), info[prop]);
          } else if (
            info[prop] == null &&
            info[link] != null
          ) {
          } else if (
            info[prop] == null &&
            info[link] == null
          ) {
            data.append(snakeCase(prop), "");
          }
        }
      }
      if (this.state.update === false) {
        axios({
          method: "post",
          url: "/api/student_profile/" + url + "/",
          data: data,
          headers: headers
        })
          .then(response => {
            let data = response.data;
            this.props.appendData(
              data,
              this.props.data,
              this.props.componentName
            );
            this.setState(initial, () => {
              this.props.handleHide(this.props.componentName);
            });
          })
          .catch(error => {
            // console.error(error);
            if (error.response.status == "400") {
              this.handleErrors(error.response.data);
            } else {
              this.props.handleHide(this.props.componentName);
              toast({
                type: 'error',
                title: 'Error',
                icon: 'delete',
                description: <p>Some error has occurred. Try refilling the form</p>,
                time: 2000
              });
            }
          });
      } else {
        axios({
          method: option,
          url: "/api/student_profile/" + url + "/" + this.state.data.id + "/",
          data: data,
          headers: headers
        })
          .then(response => {
            let data = response.data;
            if (option == "delete") data = this.state.data;
            const {updateDeleteData, handleHide, componentName} = this.props;
            updateDeleteData(
              data,
              option,
              this.props.data,
              componentName
            );
            this.setState(initial, () => {
              handleHide(componentName);
            });
          })
          .catch(error => {
            // console.error(error);
            if (error.response.status == "400") {
              this.handleErrors(error.response.data);
            } else if (error.response.status == "403") {
              toast({
                type: 'error',
                title: 'Error',
                icon: 'delete',
                description: <p>You cannot delete verified information!</p>,
                time: 2000
              });
              handleHide(componentName);
            }
          });
      }
    };

    handleChange = (name, value) => {
      if (this.state.data.hasOwnProperty(name) || true) {
        this.setState({ data: { ...this.state.data, [name]: value } });
      }
    };

    handleDelete = name => {
      let link = name + "Link";
      this.setState({
        data: { ...this.state.data, [name]: null, [link]: null }
      });
    };

    handleErrors = error_dict => {
      let dict = error_dict;
      let errors = [];
      for (let key in dict) {
        for (let index in dict[key]) {
          errors.push(startCase(key) + ": " + dict[key][index]);
        }
      }
      this.setState({ errors: errors });
    };
    render() {
      const { update, errors } = this.state;
      const { handleHide, componentName } = this.props;
      const { handleSubmit, makeForm } = this;
      const { theme } = this.props.appDetails;
      let formElements = makeForm(info);
      return (
        <Segment basic styleName="style.formMinWidth">
          <Segment attached="top" styleName="style.headingBox">
            <h3 styleName="style.heading">{name}</h3>
            <Icon
              color="grey"
              name="delete"
              onClick={() => handleHide(componentName)}
            />
          </Segment>

          <Segment attached styleName="style.formStyle">
            <ErrorTransition errors={errors} />
            <Form autoComplete="off">{formElements}</Form>
            <Confirm
              header="Delete"
              open={this.state.open}
              content="Are you sure you want to delete?"
              onConfirm={() => handleSubmit("delete")}
              onCancel={() => {
                this.setState({ open: false });
              }}
              size="tiny"
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
              <Button onClick={() => handleSubmit("put")} color={theme}>
                Save Changes
              </Button>
            </Segment>
          ) : (
            <Segment attached="bottom" styleName="style.buttonBox">
              <Button
                onClick={() => handleSubmit()}
                color={theme}
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
