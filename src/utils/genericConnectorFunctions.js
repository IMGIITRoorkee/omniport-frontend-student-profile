import {
  fetchData,
  manageData,
  appendData,
  handleShow,
  handleHide,
  updateDeleteData,
  handleDragHide,
  handleDragShow,
  handleUpdate,
  updateSectionVisibility
} from "../actions/genericActions";

export const _mapStateToProps = componentName => {
  return (state) => {
    return {
      state: state[componentName],
      appDetails: state.appDetails
    };
  };
};

export const mapDispatchToProps = dispatch => ({
  fetchData: (componentName, editMode, handle) => dispatch(fetchData(componentName, editMode, handle)),
  manageData: (id, data, componentName) =>
    dispatch(manageData(id, data, componentName)),
  appendData: (item, data, componentName) =>
    dispatch(appendData(item, data, componentName)),
  handleShow: componentName => dispatch(handleShow(componentName)),
  handleHide: componentName => dispatch(handleHide(componentName)),
  updateDeleteData: (item, option, data, componentName) =>
    dispatch(updateDeleteData(item, option, data, componentName)),
  handleDragShow: componentName => dispatch(handleDragShow(componentName)),
  handleDragHide: componentName => dispatch(handleDragHide(componentName)),
  handleUpdate: (data, componentName) =>
    dispatch(handleUpdate(data, componentName)),
  updateSectionVisibility: (data, componentName) => 
    dispatch(updateSectionVisibility(data, componentName)),
});
