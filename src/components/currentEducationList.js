import React from "react";
import { CurrentEducation } from "./currentEducation";
import { CurrentEducationForm } from "./currentEducationForm";
import { Dimmer, Icon, Segment, Container, Header } from "semantic-ui-react";
import axios from "axios";
import style from "../styles.css";

import { initial } from "./currentEducationForm";
import { ComponentTransition } from "./transition";
export class CurrentEducationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { update: false, active: false, formData: null, data: [] };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = e => {
    let url = "";
    if (this.props.handle != undefined) url = this.props.handle + "/handle/";
    axios
      .get("/api/student_profile/current_education/" + url)
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
  manageData = id => {
    this.setState({
      formData: this.state.data.find(x => x.id == id),
      update: true,
      active: true
    });
  };
  appendData = item => {
    let data = this.state.data;
    for (var i = 0; i < data.length; i++) {
      if (item.id == data[i].id) {
        data[i] = item;
        break;
      }
    }
    this.setState({ data: [data] });
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
    const { theme } = this.props;

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
          <CurrentEducation
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
        <Segment padded color={theme}>
          <div styleName="style.headingBox">
            <h3 styleName="style.heading">
              <Icon name="student" color={theme} /> Current education
            </h3>
            {this.props.handle != undefined ? null : (
              <div>
                <Icon color="grey" name="add" onClick={handleShow} />
              </div>
            )}
          </div>

          <Dimmer active={active} page>
            <CurrentEducationForm
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
