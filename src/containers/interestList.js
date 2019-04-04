import { connect } from "react-redux";

import {
  fetchData,
  manageData,
  appendData,
  handleShow,
  handleHide,
  updateDeleteData,
  handleDragHide,
  handleDragShow,
  handleUpdate
} from "../actions/genericActions";

// import { toggleTodo } from "../actions";
// import TodoList from "../components/TodoList";
// import { VisibilityFilters } from "../actions";

import { listComponents } from "./../constants/listComponents";

const InterestList = listComponents["interest"];
// const AchievementList = listComponents["achievement"];

const mapStateToProps = state => ({
  state: state.interest,
  //state.handle thing is left
  handle: state.handle
});

const mapDispatchToProps = dispatch => ({
  fetchData: componentName => dispatch(fetchData(componentName)),
  manageData: (id, data, componentName) => dispatch(manageData(id, data, componentName)),
  appendData: (item, data, componentName) => dispatch(appendData(item, data, componentName)),
  handleShow: componentName => dispatch(handleShow(componentName)),
  handleHide: componentName => dispatch(handleHide(componentName)),
  updateDeleteData: (item, option, data, componentName) => dispatch(updateDeleteData(item, option, data, componentName)),
  handleDragShow: componentName => dispatch(handleDragShow(componentName)),
  handleDragHide: componentName => dispatch(handleDragHide(componentName)),
  handleUpdate: (data, componentName) => dispatch(handleUpdate(data, componentName))
});

const InterestListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InterestList);

export { InterestListContainer };
