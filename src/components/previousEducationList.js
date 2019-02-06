import React from "react";
import { PreviousEducation } from "./previousEducation";
import { Dimmer, Icon, Segment, Container, Header } from "semantic-ui-react";
import axios from "axios";
import style from "../styles.css";
import { initial } from "./previousEducationForm";
import { ComponentTransition } from "./transition";
import genericFormMaker from "./genericFormMaker";
// import { previousEducationSpecs } from "../constants";

const PreviousEducationForm = genericFormMaker(previousEducationSpecs);
function compare(a, b) {
  return a.year < b.year;
}
export class PreviousEducationList extends React.Component {
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
    axios
      .get("/api/student_profile/previous_education/" + url)
      .then(response => {
        if (response.data.length == 0 && handle != undefined) {
          this.setState({ empty: "No previous education to show" });
        } else {
          let objs = response.data;
          objs.sort(compare);
          this.setState({ data: objs });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  manageData = id => {
    let formData = Object.assign({}, this.state.data.find(x => x.id == id));
    console.log(formData);
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
  appendData = item => {
    let data = this.state.data;
    let n = data.length;
    let i = 0;
    let flag = false;
    for (i = 0; i < n; i++) {
      if (data[i].year <= item.year) {
        data.splice(i, 0, item);
        flag = true;
        this.setState({ data: data });
        break;
      }
    }
    if (flag == false) {
      data.splice(i, n, item);
      this.setState({ data: data });
    }
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
    let { theme } = this.props;
    if (theme == "zero") theme = null;

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
        <Segment padded color={theme}>
          <div styleName="style.headingBox">
            <h3 styleName="style.heading">
              <Icon name="student" color={theme || "blue"} /> Previous education
            </h3>
            {this.props.handle != undefined ? null : (
              <Icon color="grey" name="add" circular onClick={handleShow} />
            )}
            {this.props.handle != undefined ? (
              <span style={{ color: "grey", textAlign: "right" }}>
                {this.state.empty}
              </span>
            ) : null}
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
