import React from "react";
import { PreviousEducation } from "./previousEducation";
import { PreviousEducationForm } from "./previousEducationForm";
import { Dimmer, Icon, Segment, Container, Header } from "semantic-ui-react";
import axios from "axios";
import style from "../styles.css";
import { initial } from "./previousEducationForm";
import { ComponentTransition } from "./transition";

export class PreviousEducationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { update: false, active: false, formData: null, data: [] };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = e => {
    axios
      .get("/api/student_profile/previous_education/")
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
  manageData = id => {
    let data = this.state.data.find(x => x.id == id);
    data.year = String(data.year);
    this.setState({
      formData: this.state.data.find(x => x.id == id),
      update: true,
      active: true
    });
  };
  appendData = item => {
    this.setState({ data: [...this.state.data, item] });
  };
  updateDeleteData = (item, option) => {
    const data_array = this.state.data;
    if (option == "delete") {
      const newData = data_array.filter(obj =>
        obj.id != item.id ? true : false
      );
      this.setState({ data: newData });
    } else if (option == "put") {
      const newData = data_array.map(obj => (obj.id == item.id ? item : obj));
      this.setState({ data: newData });
    }
  };
  handleShow = e => {
    this.setState({
      active: true,
      formData: initial.data,
      update: false
    });
  };
  handleHide = e => {
    this.setState({ active: false, update: false });
  };

  render() {
    const { active, update, formData, data } = this.state;
    const {
      fetchData,
      appendData,
      updateDeleteData,
      handleHide,
      handleShow
    } = this;

    let data_array;
    let children;
    if (data) {
      children = data.map(data => {
        return (
          <PreviousEducation
            data={data}
            key={data.id}
            manageData={this.manageData}
            rearrange={this.props.handle != undefined}
          />
        );
      });
    }
    return (
      <ComponentTransition>
        <Segment padded color="teal">
          <div styleName="style.headingBox">
            <h3 styleName="style.heading">
              <Icon name="certificate" color="teal" /> Previous education
            </h3>
            {this.props.handle != undefined ? null : (
              <Icon color="grey" name="add" onClick={handleShow} />
            )}{" "}
          </div>

          <Dimmer active={active} page>
            <PreviousEducationForm
              update={update}
              formData={formData}
              fetchData={fetchData}
              appendData={appendData}
              updateDeleteData={updateDeleteData}
              handleHide={handleHide}
            />
          </Dimmer>
          {data == "" ? null : <Segment.Group> {children}</Segment.Group>}
        </Segment>
      </ComponentTransition>
    );
  }
}
