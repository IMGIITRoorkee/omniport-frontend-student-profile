import React from "react";
import { Referee } from "./referee";
import { RefereeForm } from "./refereeForm";
import { Dimmer, Icon, Segment, Transition, Button, Popup } from "semantic-ui-react";
import axios from "axios";
import style from "../styles.css";
import { initial } from "./refereeForm";
import { ComponentTransition } from "./transition";
import { DragAndDropBox } from "./dragAndDropBox";

export class RefereeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      active: false,
      formData: null,
      data: [],
      rearrange: false
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = e => {
    let url = "";
    if (this.props.handle != undefined) url = this.props.handle + "/handle/";
    axios
      .get("/api/student_profile/referee/" + url)
      .then(response => {
        this.setState({ data: response.data }, () => {});
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
    this.setState({ data: [...this.state.data, item] });
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
  handleUpdate = data => {
    this.setState({
      data: data,
      rearrange: false
    });
  };
  render() {
    const { active, update, formData, data, rearrange } = this.state;
    const { theme } = this.props;
    const {
      fetchData,
      appendData,
      updateDeleteData,
      handleHide,
      handleShow,
      handleUpdate,
      handleDragHide,
      handleDragShow
    } = this;

    let data_array;
    let children;
    if (data) {
      children = data.map(data => {
        return (
          <Referee data={data} key={data.id} manageData={this.manageData} rearrange={this.props.handle != undefined} />
        );
      });
    }
    return (
      <ComponentTransition>
        <Segment padded color={theme}>
          <div styleName="style.headingBox" disable="true">
            <h3 styleName="style.heading">
              <Icon name="at" color={theme} /> References
            </h3>
            {this.props.handle != undefined ? null : (
              <div>
                <Icon color="grey" name="sort" circular onClick={handleDragShow} />
                <Icon color="grey" name="add" circular onClick={handleShow} />
              </div>
            )}
          </div>
          <Dimmer active={active} page>
            <RefereeForm
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
              modelName="Referee"
              element={Referee}
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
