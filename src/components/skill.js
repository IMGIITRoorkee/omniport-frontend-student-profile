import React from "react";
import { Dimmer, Icon, Segment } from "semantic-ui-react";
import axios from "axios";
import { getCookie } from "formula_one";
import style from "../stylesheets/internship.css";
import { SkillForm } from "./skillForm";

export class Skill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        computerLanguages: "",
        softwarePackages: "",
        additionalCourses: "",
        minorCourses: "",
        languages: ""
      },
      person_data: "",
      active: false,
      createNew: true
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = e => {
    const self = this;
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    axios
      .get("/api/student_profile/skill/")
      .then(function(response) {
        console.log(response.data);

        if (response.data.length != 0) {
          console.log("already created");
          self.setState({ data: response.data[0], createNew: false });
        } else {
          self.setState({ createNew: true });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleShow = e => {
    this.setState({
      active: true
    });
  };
  handleUpdate = (data, flag) => {
    this.setState({ active: false, data: data, createNew: flag });
  };
  handleHide = () => {
    this.setState({ active: false });
  };

  render() {
    const desc = this.state.data.description;
    console.log(desc);
    const additionalCourses =
      this.state.data.additionalCourses != "" ? (
        <Segment basic>
          <h4>Additional Courses</h4>
          <p>{this.state.data.additionalCourses}</p>
        </Segment>
      ) : null;
    const softwarePackages =
      this.state.data.softwarePackages != "" ? (
        <Segment basic>
          <h4>Software Packages</h4>
          <p>{this.state.data.softwarePackages}</p>
        </Segment>
      ) : null;
    const computerLanguages =
      this.state.data.computerLanguages != "" ? (
        <Segment basic>
          <h4>Computer Languages</h4>
          <p>{this.state.data.computerLanguages}</p>
        </Segment>
      ) : null;
    const minorCourses =
      this.state.data.minorCourses != "" ? (
        <Segment basic>
          <h4>Minor Courses</h4>
          <p>{this.state.data.minorCourses}</p>
        </Segment>
      ) : null;
    const languages =
      this.state.data.languages != "" ? (
        <Segment basic>
          <h4>Languages</h4>
          <p>{this.state.data.languages}</p>
        </Segment>
      ) : null;

    return (
      <Segment padded color="red">
        <div styleName="style.flex-box">
          <h3>SKILLS</h3>
          <div>
            <Icon name="edit" color="grey" onClick={this.handleShow} />
          </div>
        </div>
        <div>
          {additionalCourses}
          {minorCourses}
          {computerLanguages}
          {softwarePackages}
          {languages}
        </div>

        <Dimmer active={this.state.active} page>
          <SkillForm
            data={this.state.data}
            createNew={this.state.createNew}
            handleHide={this.handleHide}
            handleUpdate={this.handleUpdate}
          />
        </Dimmer>
      </Segment>
    );
  }
}
