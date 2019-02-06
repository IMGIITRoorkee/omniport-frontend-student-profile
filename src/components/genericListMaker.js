// package imports
import React from "react";
import { Dimmer, Icon, Segment } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";
import changeCase from "change-case";

// css imports
import style from "../styles.css";
import inline from "formula_one/src/css/inline.css";

// other
import genericFormMaker from "./genericFormMaker";
import { initial } from "./../constants/initial";
import { specs } from "./../constants/specs";
import { DragAndDropBox } from "./dragAndDropBox";
import { ComponentTransition } from "./transition";

//temp
import { formComponents } from "./../constants/formComponents";
import { displayComponents } from "./../constants/displayComponents";

const genericListMaker = componentName => {
  const FormComponent = formComponents[componentName];
  const DisplayComponent = displayComponents[componentName];
  class GenericList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        update: false,
        active: false,
        formData: initial[componentName].data,
        data: [],
        empty: ""
      };
    }
    componentDidMount() {
      this.fetchData();
    }
    componentDidUpdate() {
      console.log("yaa");
    }
    fetchData = e => {
      let url = "";
      let { handle } = this.props;
      if (this.props.handle != undefined) {
        url = this.props.handle + "/handle/";
      }
      axios
        .get("/api/student_profile/interest/")
        .then(response => {
          console.log("res", response);
          if (response.data.length == 0 && handle != undefined)
            this.setState({
              empty:
                "No " + changeCase.sentenceCase(componentName) + " data to show"
            });
          else {
            this.setState({ data: response.data });
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
    manageData = id => {
      let formData = Object.assign({}, this.state.data.find(x => x.id == id));
      for (let i in initial[`${componentName}`].links) {
        let name = initial[`${componentName}`].links[i];
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
      console.log(option);
      if (option == "delete") {
        let newData = data_array.filter(obj =>
          obj.id != item.id ? true : false
        );
        console.log("delete", newData);
        this.setState({ data: newData });
      } else if (option == "put") {
        const newData = data_array.map(obj => (obj.id == item.id ? item : obj));
        this.setState({ data: newData });
      }
    };
    handleShow = e => {
      this.setState({
        active: true,
        formData: initial[componentName].data,
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
      const { active, update, formData, data } = this.state;
      let { theme } = this.props;
      if (theme == "zero") theme = null;
      const {
        fetchData,
        appendData,
        updateDeleteData,
        handleHide,
        handleShow,
        handleDragShow,
        handleUpdate
      } = this;

      let data_array;
      let children;

      if (data != "") {
        children = data.map(data => {
          return (
            <DisplayComponent
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
                {/* modify icon */}
                <Icon name="paperclip" color={theme || "blue"} />{" "}
                {_.capitalize(componentName) + "s"}
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
              <FormComponent
                update={update}
                formData={formData}
                fetchData={fetchData}
                appendData={appendData}
                updateDeleteData={updateDeleteData}
                handleHide={handleHide}
              />
            </Dimmer>
            {/* leaving rearrange part for now */}
            {/* <Dimmer active={rearrange} page>
              <DragAndDropBox
                data={data}
                modelName="Paper"
                element={Paper}
                handleUpdate={handleUpdate}
                handleDragHide={this.handleDragHide}
              />
            </Dimmer> */}
            {data == "" ? null : <Segment.Group> {children}</Segment.Group>}
          </Segment>
        </ComponentTransition>
      );
    }
  }
  return GenericList;
};
export default genericListMaker;