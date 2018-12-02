import React from "react";
import { Interest } from "./interest";
import { InterestForm } from "./interestForm";
import { Dimmer, Icon, Container } from "semantic-ui-react";
import axios from "axios";
import style from "../stylesheets/interestList.css";

export class InterestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { update: false, active: false, formData: null, data: null };
    this.manageData = this.manageData.bind(this);
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
  manageData(id) {
    this.setState({
      formData: this.state.data.find(x => x.id == id),
      update: true,
      active: true
    });
  }
  fetchData = e => {
    const self = this;
    axios
      .get("/api/student_profile/interest/")
      .then(function(response) {
        self.setState({ data: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { active } = this.state;

    console.log(this.state.active);
    let data_array = null;
    let children = null;
    if (this.state.data) {
      let that = this;
      console.log(this.state.data);
      children = this.state.data.map(function(data) {
        return (
          <Interest data={data} key={data.id} manageData={that.manageData} />
        );
      });
    }
    console.log(this.state.active);
    return (
      <Container styleName="style.listBox">
        <div styleName="style.headingBox">
          <h3 styleName="style.heading">INTERESTS</h3>
          <Icon circular color="grey" name="add" onClick={this.handleShow} />
        </div>
        <Dimmer active={active}>
          <InterestForm
            handleHide={this.handleHide}
            update={this.state.update}
            formData={this.state.formData}
            fetchData={this.fetchData}
          />
        </Dimmer>

        {children}
      </Container>
    );
  }
}
