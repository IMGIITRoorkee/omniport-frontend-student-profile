import React from "react";
import { Interest } from "./interest";
import { InterestForm } from "./interestForm";
import { Dimmer, Icon, Container } from "semantic-ui-react";
import axios from "axios";


export class profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { update: false, active: false, formData: null, data: null };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = e => {
    const self = this;
    axios
      .get("/api/student_profile/profile/")
      .then(function(response) {
        self.setState({ data: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  manageData = () => {
    this.setState({
      formData: this.state.data,
      update: true,
      active: true
    });
  }
 
  handleShow = e => {
    this.setState({
      active: true,
      formData: { name: "", id: -1 },
      update: false
    });
  };
  handleHide = e => {
    this.setState({ active: false, update: false });
  };

  render() {
    const { active, update, formData, data} = this.state;
    const { fetchData,  updateDeleteData, handleHide, handleShow } = this;

  }
}
