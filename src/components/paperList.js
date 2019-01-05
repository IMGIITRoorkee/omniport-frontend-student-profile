import React from "react";
import { Paper } from "./paper";
import { PaperForm } from "./paperForm";
import { Dimmer, Icon, Segment, Popup, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "../styles.css";
import inline from "formula_one/src/css/inline.css";
import { initial } from "./paperForm";
import { DragAndDropBox } from "./dragAndDropBox";
import { ComponentTransition } from "./transition";

export class PaperList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      active: false,
      formData: initial.data,
      data: []
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = e => {
    let url = "";
    if (this.props.handle != undefined) url = this.props.handle + "/handle/";
    axios
      .get("/api/student_profile/paper/" + url)
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
  handleHide = e => {
    this.setState({ active: false, update: false });
  };

  render() {
    const { active, update, formData, data, rearrange } = this.state;
    const { theme } = this.props;
    const { fetchData, appendData, updateDeleteData, handleHide, handleShow, handleDragShow, handleUpdate } = this;

    let data_array;
    let children;
    if (data != "") {
      children = data.map(data => {
        return (
          <Paper data={data} key={data.id} manageData={this.manageData} rearrange={this.props.handle != undefined} />
        );
      });
    }
    return (
      <ComponentTransition>
        <Segment padded color={theme}>
          <div styleName="style.headingBox">
            <h3 styleName="style.heading">
              <Icon name="paperclip" color={theme} /> Papers Authored
            </h3>
            {this.props.handle != undefined ? null : (
              <div>
                <Popup
                  trigger={<Icon color="grey" name="sort" onClick={handleDragShow} />}
                  content="Rearrange the information"
                />
                <Icon color="grey" name="add" onClick={handleShow} />
              </div>
            )}
          </div>

          <Dimmer active={active} page>
            <PaperForm
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
              modelName="Paper"
              element={Paper}
              handleUpdate={handleUpdate}
              handleDragHide={this.handleDragHide}
            />
          </Dimmer>
          {data == "" ? null : <Segment.Group> {children}</Segment.Group>}
        </Segment>
      </ComponentTransition>
    );
  }
}
