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
  }
  componentDidMount() {
    this.fetchData();
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
  manageData=(id)=> {
    this.setState({
      formData: this.state.data.find(x => x.id == id),
      update: true,
      active: true
    });
  }
  appendData = item => {
    this.setState({ data: [...this.state.data, item] });
  };
  updateDeleteData = (item, option) => {
    const data_array = this.state.data;
    if (option == "delete") {
      const newData = data_array.filter(obj =>
        obj.id != item.id ? true : false
      );
      this.setState({ data: newData });
    } else if (option == "put") {
      const newData = data_array.map(obj => (obj.id == item.id ? item : obj));
      this.setState({ data: newData });
    }
  };
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
    const { fetchData, appendData, updateDeleteData, handleHide, handleShow } = this;

    console.log(active);
    let data_array = null;
    let children = null;
    if (data) {
      let that = this;
      console.log(data);
      children = data.map(function(data) {
        return (
          <Interest data={data} key={data.id} manageData={that.manageData} />
        );
      });
    }
    console.log(active);
    return (
      <Container styleName="style.listBox">
        <div styleName="style.headingBox">
          <h3 styleName="style.heading">INTERESTS</h3>
          <Icon circular color="grey" name="add" onClick={handleShow} />
        </div>
        <Dimmer active={active}>
          <InterestForm
            update={update}
            formData={formData}
            fetchData={fetchData}
            appendData={appendData}
            updateDeleteData={updateDeleteData}
            handleHide={handleHide}
          />
        </Dimmer>

        {children}
      </Container>
    );
  }
}
