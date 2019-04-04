// package imports
import React from "react";
import { Dimmer, Icon, Segment } from "semantic-ui-react";
import axios from "axios";
import { upperFirst } from "lodash";

// css imports
import style from "../styles.css";
import inline from "formula_one/src/css/inline.css";

// other
import genericFormMaker from "./genericFormMaker";
import { initial } from "./../constants/initial";
import { specs } from "./../constants/specs";
import { DragAndDropBox } from "./dragAndDropBox";
import { ComponentTransition } from "./transition";
import { displayComponents } from "./../constants/displayComponents";

const genericListMaker = (componentName, FormComponent) => {
  const DisplayComponent = displayComponents[componentName];
  // localSpecs will have all the info about the component.
  const localSpecs = specs[componentName];
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
      this.props.fetchInterests();
    }
    // fetchData = e => {
    //   let url = "";
    //   let { handle } = this.props;
    //   if (handle != undefined) {
    //     url = handle + "/handle/";
    //   }
    //   axios
    //     .get("/api/student_profile/" + localSpecs.url + "/")
    //     .then(response => {
    //       if (response.data.length == 0 && handle != undefined)
    //         this.setState({
    //           empty: "No data to show!"
    //         });
    //       else {
    //         this.setState({ data: response.data });
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // };
    // manageData = id => {
    //   let formData = Object.assign({}, this.state.data.find(x => x.id == id));
    //   for (let i in initial[componentName].links) {
    //     let name = initial[componentName].links[i];
    //     formData[name + "Link"] = formData[name];
    //     formData[name] = null;
    //   }
    //   this.setState({
    //     formData: formData,
    //     update: true,
    //     active: true
    //   });
    // };
    // appendData = item => {
    //   let sortBy = localSpecs.sortBy;
    //   let ascending = localSpecs.ascending;
    //   let data = this.state.data;

    //   let n = data.length;
    //   let i = 0;
    //   let flag = false;
    //   for (i = 0; i < n; i++) {
    //     if (ascending ? data[i][sortBy] >= item[sortBy] : data[i][sortBy] <= item[sortBy]) {
    //       data.splice(i, 0, item);
    //       this.setState({ data: data });
    //       flag = true;
    //       break;
    //     }
    //   }
    //   if (flag == false) {
    //     data.splice(i, n, item);
    //     this.setState({ data: data });
    //   }
    // };
    // updateDeleteData = (item, option) => {
    //   const data_array = this.state.data;
    //   if (option == "delete") {
    //     let newData = data_array.filter(obj => (obj.id != item.id ? true : false));
    //     this.setState({ data: newData });
    //   } else if (option == "put") {
    //     const newData = data_array.map(obj => (obj.id == item.id ? item : obj));
    //     newData.sort(function compare(a, b, sortBy, ascending) {
    //       if (ascending == true) {
    //         if (a[sortBy] < b[sortBy]) return -1;
    //         if (a[sortBy] > b[sortBy]) return 1;
    //         return 0;
    //       } else {
    //         if (a[sortBy] > b[sortBy]) return -1;
    //         if (a[sortBy] < b[sortBy]) return 1;
    //         return 0;
    //       }
    //     });
    //     this.setState({ data: newData });
    //   }
    // };
    // handleShow = e => {
    //   this.setState({
    //     active: true,
    //     formData: initial[componentName].data,
    //     update: false
    //   });
    // };
    // handleDragShow = () => {
    //   this.setState({
    //     rearrange: true
    //   });
    // };
    // handleDragHide = () => {
    //   this.setState({
    //     rearrange: false
    //   });
    // };
    // handleUpdate = data => {
    //   this.setState({
    //     data: data,
    //     rearrange: false
    //   });
    // };
    // handleHide = e => {
    //   this.setState({ active: false, update: false });
    // };

    render() {
      const { active, update, data, formData, rearrange, empty } = this.props.state;
      const { theme, handle } = this.props;
      if (theme == "zero") theme = null;
      const { fetchData, appendData, updateDeleteData, handleHide, handleShow, handleDragShow, handleDragHide, handleUpdate } = this;

      let children;

      if (data != "") {
        children = data.map(item => {
          return <DisplayComponent item={item} data={data} key={item.id} manageData={this.props.manageData} rearrange={handle != undefined} />;
        });
      }
      return (
        <ComponentTransition>
          <Segment padded color={theme}>
            <div styleName="style.headingBox">
              <h3 styleName="style.heading">
                {/* modify icon */}
                <Icon name={localSpecs.icon} color={theme || "blue"} /> {localSpecs.plural}
              </h3>
              <div>
                {handle == undefined && localSpecs.draggable == true && data.length > 1 ? (
                  <Icon color="grey" name="sort" circular onClick={handleDragShow} />
                ) : null}
                {handle == undefined ? <Icon color="grey" name="add" circular onClick={handleShow} /> : null}
              </div>

              {handle != undefined ? <span style={{ color: "grey", textAlign: "right" }}>{empty}</span> : null}
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

            {localSpecs.draggable ? (
              <Dimmer active={rearrange} page>
                <DragAndDropBox
                  data={data}
                  modelName={upperFirst(componentName)}
                  element={displayComponents[componentName]}
                  handleUpdate={handleUpdate}
                  handleDragHide={handleDragHide}
                />
              </Dimmer>
            ) : null}
            {data == "" ? null : <Segment.Group> {children}</Segment.Group>}
          </Segment>
        </ComponentTransition>
      );
    }
  }
  return GenericList;
};
export default genericListMaker;
