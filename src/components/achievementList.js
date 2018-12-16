import React from "react";
import {
  Dimmer,
  Icon,
  Segment,
  Container,
  Header,
  Divider,
  Popup
} from "semantic-ui-react";
import axios from "axios";
import style from "../styles.css";
import inline from "formula_one/src/css/inline.css";
import { Achievement } from "./achievement";
import { AchievementForm } from "./achievementForm";
import { initial } from "./achievementForm";
import { DragAndDropBox } from "./dragAndDropBox";
import { ComponentTransition } from "./transition";

export class AchievementList extends React.Component {
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
    axios
      .get("/api/student_profile/achievement/")
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
  handleUpdate = data => {
    this.setState({
      data: data,
      rearrange: false
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
  render() {
    const { active, update, formData, data, rearrange } = this.state;
    const {
      fetchData,
      appendData,
      updateDeleteData,
      handleHide,
      handleShow,

      handleDragHide,
      handleDragShow,
      handleUpdate
    } = this;
    let data_array;
    let children;
    if (data) {
      children = data.map(data => {
        return (
          <Achievement
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
              <Icon name="winner" color="teal" /> Achievements
            </h3>
            {this.props.handle != undefined ? null : (
              <div>
                <Popup
                  trigger={
                    <Icon color="grey" name="sort" onClick={handleDragShow} />
                  }
                  content="Rearrange the information"
                />
                <Icon color="grey" name="add" onClick={handleShow} />
              </div>
            )}
          </div>
          <Dimmer active={active} page>
            <AchievementForm
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
              modelName="Achievement"
              element={Achievement}
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
