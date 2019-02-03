import React from "react";
import { Referee } from "./referee";
import { Dimmer, Icon, Segment, Transition, Button, Popup } from "semantic-ui-react";
import axios from "axios";
import style from "../styles.css";
import { initial } from "./refereeForm";
import { ComponentTransition } from "./transition";
import { DragAndDropBox } from "./dragAndDropBox";
import genericFormMaker from "./genericFormMaker";
import { refereeSpecs } from "../constants";

const RefereeForm = genericFormMaker(refereeSpecs);

export class RefereeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      active: false,
      formData: null,
      data: [],
      rearrange: false,
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
      .get("/api/student_profile/referee/" + url)
      .then(response => {
        if (response.data.length == 0 && handle != undefined) this.setState({ empty: "No referees to show" });
        else {
          this.setState({ data: response.data });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  manageData = id => {

    let formData = Object.assign({},this.state.data.find(x => x.id == id));
    for(let i in initial.links)
    {
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
    let { theme } = this.props;
    if (theme == "zero") theme = null;
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
          <div styleName="style.headingBox">
            <h3 styleName="style.heading">
              <Icon name="at" color={theme || "blue"} /> Reference
            </h3>
            {this.props.handle != undefined ? null : (
              <div>
                <Icon color="grey" name="sort" circular onClick={handleDragShow} />
                <Icon color="grey" name="add" circular onClick={handleShow} />
              </div>
            )}
            {this.props.handle != undefined ? (
              <span style={{ color: "grey", textAlign: "right" }}>{this.state.empty}</span>
            ) : null}
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
