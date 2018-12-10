import React from "react";
import {
  Dimmer,
  Icon,
  Segment,
  Container,
  Header,
  Divider
} from "semantic-ui-react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import style from "../stylesheets/interestList.css";
import inline from "formula_one/src/css/inline.css";
import { Interest } from "./interest";
import { InterestForm } from "./interestForm";
import { initial } from "./interestForm";
import { DragAndDropBox } from "./dragAndDropBox";

export class InterestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      active: false,
      formData: null,
      data: []
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = e => {
    axios
      .get("/api/student_profile/interest/")
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
    const { active, update, formData, data, rearrange } = this.state;
    const {
      fetchData,
      appendData,
      updateDeleteData,
      handleHide,
      handleShow,
      handleDragShow
    } = this;
    let data_array;
    let children;
    if (data) {
      children = data.map(data => {
        return (
          <Interest data={data} key={data.id} manageData={this.manageData} />
        );
      });
    }
    return (
      <Segment padded attached="bottom">
        <div styleName="style.headingBox">
          <Header styleName="inline.margin-bottom-0">INTERESTS</Header>
          <Icon color="grey" name="add" onClick={handleShow} />
        </div>
        <Dimmer active={active} page>
          <InterestForm
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
