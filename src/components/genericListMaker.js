// package imports
import React from "react";
import { Dimmer, Icon, Segment } from "semantic-ui-react";
import axios from "axios";
import { upperFirst } from "lodash";

// css imports
import style from "../styles.css";
import inline from "formula_one/src/css/inline.css";

// other
import { specs } from "./../constants/specs";
import { DragAndDropBox } from "./dragAndDropBox";
import { ComponentTransition } from "./transition";
import { displayComponents } from "./../constants/displayComponents";

const genericListMaker = (componentName, FormComponent) => {
  const DisplayComponent = displayComponents[componentName];
  // localSpecs will have all the info about the component.
  const localSpecs = specs[componentName];

  class GenericList extends React.Component {
    componentDidMount() {
      this.props.fetchData(componentName);
    }
    render() {
      const { active, update, data, formData, rearrange, empty } = this.props.state;
      const { theme, handle } = this.props;
      if (theme == "zero") theme = null;
      const { fetchData, appendData, updateDeleteData, handleHide, handleShow, handleDragShow, handleDragHide, handleUpdate } = this.props;

      let children;

      if (data != "") {
        children = data.map(item => {
          return (
            <DisplayComponent
              item={item}
              data={data}
              key={item.id}
              manageData={this.props.manageData}
              rearrange={handle != undefined}
              componentName={componentName}
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
                <Icon name={localSpecs.icon} color={theme || "blue"} /> {localSpecs.plural}
              </h3>
              <div>
                {handle == undefined && localSpecs.draggable == true && data.length > 1 ? (
                  <Icon color="grey" name="sort" circular onClick={handleDragShow} />
                ) : null}
                {handle == undefined ? (
                  <Icon
                    color="grey"
                    name="add"
                    circular
                    onClick={() => {
                      handleShow(componentName);
                    }}
                  />
                ) : null}
              </div>

              {handle != undefined ? <span style={{ color: "grey", textAlign: "right" }}>{empty}</span> : null}
            </div>
            <Dimmer active={active} page>
              <FormComponent
                update={update}
                formData={formData}
                fetchData={fetchData}
                data={data}
                appendData={appendData}
                updateDeleteData={updateDeleteData}
                handleHide={handleHide}
                componentName={componentName}
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
