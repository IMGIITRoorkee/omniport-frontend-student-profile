import React from "react";
import { Job } from "./job";
import { JobForm } from "./jobForm";
import { Dimmer, Icon, Segment, Popup, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "../styles.css";
import { initial } from "./jobForm";
import { DragAndDropBox } from "./dragAndDropBox";
import { ComponentTransition } from "./transition";

export class JobList extends React.Component {
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
      .get("/api/student_profile/experience/" + url)
      .then(response => {
        let data = response.data.filter(item => item.experienceType == "job");
        this.setState({ data: data });
      })
      .catch(error => {
        console.log(error);
      });
  };
  manageData = id => {
    this.setState({
      formData: this.state.data.find(x => x.id == id),
      update: true,
      active: true,
      rearrange: false
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
  handleDragShow = () => {
    this.setState({
      rearrange: true
    });
  };
  handleDragHide = () => {
    this.setState({
      rearrange: false
    });
  };
  handleHide = e => {
    this.setState({ active: false, update: false });
  };

  handleUpdate = data => {
    this.setState({
      data: data,
      rearrange: false
    });
  };
  render() {
    const { theme } = this.props;
    const { active, update, formData, data, rearrange } = this.state;
    const {
      fetchData,
      appendData,
      updateDeleteData,
      handleHide,
      handleShow,
      handleDragShow,
      handleUpdate,
      handleDragHide
    } = this;

    let data_array;
    let children = null;
    if (data != []) {
      children = data.map(data => {
        return (
          <Job
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
              <Icon name="suitcase" color={theme} /> Jobs
            </h3>
            {this.props.handle != undefined ? null : (
              <div>
                <Icon
                  color="grey"
                  name="sort"
                  circular
                  onClick={handleDragShow}
                />
                <Icon
                  color="grey"
                  name="add"
                  circular
                  circular
                  onClick={handleShow}
                />
              </div>
            )}
          </div>

          <Dimmer active={active} page>
            <JobForm
              update={update}
              formData={formData}
              fetchData={fetchData}
              appendData={appendData}
              updateDeleteData={updateDeleteData}
              handleHide={handleHide}
            />
          </Dimmer>
          <Dimmer active={rearrange} page>
            <DragAndDropBox
              data={data}
              modelName="Experience"
              element={Job}
              handleUpdate={handleUpdate}
              handleDragHide={handleDragHide}
            />
          </Dimmer>
          {data == "" ? null : <Segment.Group> {children}</Segment.Group>}
        </Segment>
      </ComponentTransition>
    );
  }
}
