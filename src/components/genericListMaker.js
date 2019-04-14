// package imports
import React from "react";
import { Dimmer, Icon, Segment } from "semantic-ui-react";
import axios from "axios";

// local imports
import { specs } from "./../constants/specs";
import { DragAndDropBox } from "./dragAndDropBox";
//check transition working or not
import { ComponentTransition } from "./transition";
import { displayContainers } from "../constants/displayContainers";
import { SegmentPlaceholder } from "./placeholders/segmentPlaceholder";

// css imports
import style from "../styles.css";
import inline from "formula_one/src/css/inline.css";

const genericListMaker = (componentName, FormComponent) => {
  const DisplayComponent = displayContainers[componentName];
  // localSpecs will have all the info about the component.
  const localSpecs = specs[componentName];

  class GenericList extends React.Component {
    render() {
      //here state is globalState[componentName]
      console.log("gl", this.props.state.formData);
      // formdata and rearrange are not present
      const { appDetails } = this.props;
      const { theme, handle } = appDetails;

      const { active, update, data, formData, rearrange, empty, loading } = this.props.state;
      if (theme == "zero") theme = null;
      const {
        appendData,
        updateDeleteData,
        handleHide,
        handleShow,
        handleDragShow,
        handleDragHide,
        handleUpdate
      } = this.props;

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
      if (loading) return <SegmentPlaceholder />;
      else
        return (
          <ComponentTransition>
            <Segment padded color={theme}>
              <div styleName="style.headingBox">
                <h3 styleName="style.heading">
                  <Icon name={localSpecs.icon} color={theme} /> {localSpecs.plural}
                </h3>
                <div>
                  {handle == undefined && localSpecs.draggable == true && data.length > 1 ? (
                    <Icon color="grey" name="sort" circular onClick={() => handleDragShow(componentName)} />
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
                  appDetails={this.props.appDetails}
                  update={update}
                  formData={formData}
                  data={data}
                  appendData={appendData}
                  updateDeleteData={updateDeleteData}
                  handleHide={handleHide}
                  componentName={componentName}
                />
              </Dimmer>
              {/* rearrange word not clear */}
              {localSpecs.draggable ? (
                <Dimmer active={rearrange} page>
                  <DragAndDropBox
                    appDetails={appDetails}
                    data={data}
                    componentName={componentName}
                    element={displayContainers[componentName]}
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
