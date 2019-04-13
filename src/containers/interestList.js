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

export const _mapStateToProps = componentName => {
  return function(state) {
    return {
      state: state[componentName]
    };
  };
};
// export const mapStateToProps = (state, componentName) => ({
//   state: state[componentName]
// });

export const mapDispatchToProps = dispatch => ({
  fetchData: componentName => dispatch(fetchData(componentName)),
  manageData: (id, data, componentName) => dispatch(manageData(id, data, componentName)),
  appendData: (item, data, componentName) => dispatch(appendData(item, data, componentName)),
  handleShow: componentName => dispatch(handleShow(componentName)),
  handleHide: componentName => dispatch(handleHide(componentName)),
  updateDeleteData: (item, option, data, componentName) =>
    dispatch(updateDeleteData(item, option, data, componentName)),
  handleDragShow: componentName => dispatch(handleDragShow(componentName)),
  handleDragHide: componentName => dispatch(handleDragHide(componentName)),
  handleUpdate: (data, componentName) => dispatch(handleUpdate(data, componentName))
});
