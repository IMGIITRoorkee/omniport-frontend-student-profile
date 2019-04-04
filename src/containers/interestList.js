import { connect } from "react-redux";
import { fetchInterests, manageData } from "../actions/interest";
// import { toggleTodo } from "../actions";
// import TodoList from "../components/TodoList";
// import { VisibilityFilters } from "../actions";
import { listComponents } from "./../constants/listComponents";

const InterestList = listComponents["interest"];

const mapStateToProps = state => ({
  state: state.interest,
  //state.handle thing is left
  handle: state.handle
});

const mapDispatchToProps = dispatch => ({
  //   toggleTodo: id => dispatch(toggleTodo(id))
  fetchInterests: () => dispatch(fetchInterests()),
  manageData: (id, state) => dispatch(manageData(id, state))
});

const InterestListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InterestList);

export default InterestListContainer;
