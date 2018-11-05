import { connect } from "react-redux";
import InterestList from "../components/interestList";
import { getDataList, postData } from "../actions/dataOperations";
const mapStateToProps = state => ({
  data: state.Interest.byId
});

const mapDispatchToProps = dispatch => ({
  getDataList: function() {
    dispatch(getDataList("Interest"));
  },
  postData: function(data) {
    dispatch(postData("Interest", data));
  }
});

export const InterestListC = connect(
  mapStateToProps,
  mapDispatchToProps
)(InterestList);
