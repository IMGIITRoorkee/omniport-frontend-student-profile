import React from "react";
import { PreviousEducation } from "./previousEducation";
import { PreviousEducationForm } from "./previousEducationForm";
import { Dimmer, Icon, Segment, Container, Header } from "semantic-ui-react";
import axios from "axios";
import style from "../styles.css";
import { initial } from "./previousEducationForm";
import { ComponentTransition } from "./transition";
function compare(a, b) {
  return a.year < b.year;
}
export class PreviousEducationList extends React.Component {
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
      .get("/api/student_profile/previous_education/" + url)
      .then(response => {
        let objs = response.data;
        objs.sort(compare);
        this.setState({ data: objs });
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
    let data = this.state.data;
    let n = data.length;
    let i = 0;
    for (i = 0; i < n; i++) {
      if (data[i].year <= item.year) {
        data.splice(i, 0, item);
        this.setState({ data: data });
        console.log(i);
        break;
      }
    }
  };
  updateDeleteData = (item, option) => {
    const data_array = this.state.data;
    if (option == "delete") {
      const newData = data_array.filter(obj => (obj.id != item.id ? true : false));
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

    const { fetchData, appendData, updateDeleteData, handleHide, handleShow } = this;

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
              <Icon name="student" color={theme} /> Previous education
            </h3>
            {this.props.handle != undefined ? null : <Icon color="grey" name="add" circular onClick={handleShow} />}{" "}
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
