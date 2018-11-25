import React from "react";
import { Interest } from "./interest";
import { InterestForm } from "./interestForm";
import {
  Button,
  Dimmer,
  Header,
  Icon,
  Image,
  Segment
} from "semantic-ui-react";
import axios from "axios";

export class InterestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { update: false, active: false, formData: null, data: null };
    this.handleHide = this.handleHide.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.manageData = this.manageData.bind(this);
  }
  handleShow() {
    this.setState({
      active: true,
      formData: { name: "", id: -1 },
      update: false
    });
  }
  handleHide() {
    this.setState({ active: false, update: false });
  }
  manageData(id) {
    this.setState({
      formData: this.state.data.find(x => x.id == id),
      update: true,
      active: true
    });
  }
  addData = data => {
    const oldData = this.state.data;
    this.setState({ data: [...oldData, data] });
  };
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
      <div style={{ border: "solid 2px black" }}>
        <div>
          Interest
          <Button.Group>
            <Button icon="plus" onClick={this.handleShow} />
          </Button.Group>
        </div>
        <Dimmer active={active}>
          <InterestForm
            handleHide={this.handleHide}
            update={this.state.update}
            formData={this.state.formData}
            addData={this.addData}
            fetchData={this.fetchData}
          />
        </Dimmer>
        {children}
      </div>
    );
  }
}
