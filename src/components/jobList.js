import React from "react";
import { Job } from "./job";

import { Dimmer, Icon, Segment, Popup, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "../styles.css";
import { initial } from "./jobForm";
import { DragAndDropBox } from "./dragAndDropBox";
import { ComponentTransition } from "./transition";
import genericFormMaker from "./genericFormMaker";
// import { jobSpecs } from "../constants";

const JobForm = genericFormMaker(jobSpecs);
export class JobList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      active: false,
      formData: null,
      data: [],
      empty: ""
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = e => {
    let url = "";
    let { handle } = this.props;
    if (this.props.handle != undefined) url = this.props.handle + "/handle/";
    axios.get("/api/student_profile/experience/" + url).then(response => {
      if (response.data.length == 0 && handle != undefined)
        this.setState({ empty: "No jobs to show" });
      else {
        let data = response.data.filter(item => item.experienceType == "job");
        this.setState({ data: data });
      }
    });
  };
  manageData = id => {
    let formData = Object.assign({}, this.state.data.find(x => x.id == id));
    for (let i in initial.links) {
      let name = initial.links[i];
      formData[name + "Link"] = formData[name];
      formData[name] = null;
    }
    this.setState({
      formData: formData,
      update: true,
      active: true
    });
  };
  endData = item => {
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
    let { theme } = this.props;
    if (theme == "zero") theme = null;
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
              <Icon name="suitcase" color={theme || "blue"} /> Jobs
            </h3>
            {this.props.handle != undefined ? null : (
              <div>
                <Icon
                  color="grey"
                  name="sort"
                  circular
                  onClick={handleDragShow}
                />
                <Icon color="grey" name="add" circular onClick={handleShow} />
              </div>
            )}
            {this.props.handle != undefined ? (
              <span style={{ color: "grey", textAlign: "right" }}>
                {this.state.empty}
              </span>
            ) : null}
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
