import React from "react";
import { Internship } from "./internship";
import { InternshipForm } from "./internshipForm";
import {
  Dimmer,
  Icon,
  Segment,
  Container,
  Header,
  Divider
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "../stylesheets/internshipList.css";
import inline from "formula_one/src/css/inline.css";
import { initial } from "./internshipForm";

export class InternshipList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { update: false, active: false, formData: null, data: null };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = e => {
    axios
      .get("/api/student_profile/experience/")
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
    this.setState({ data: [item, ...this.state.data] });
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
          <Internship data={data} key={data.id} manageData={this.manageData} />
        );
      });
    }
    return (
      <Segment padded>
        <div styleName="style.headingBox">
          <Header styleName="inline.margin-bottom-0">Internships</Header>
          <Icon color="grey" name="add" onClick={handleShow} />
        </div>

        <Dimmer active={active} page>
          <InternshipForm
            update={update}
            formData={formData}
            fetchData={fetchData}
            appendData={appendData}
            updateDeleteData={updateDeleteData}
            handleHide={handleHide}
          />
        </Dimmer>
        <Segment.Group> {children}</Segment.Group>
      </Segment>
    );
  }
}