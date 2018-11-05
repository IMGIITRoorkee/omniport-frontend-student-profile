import React from "react";
import Interest from "./interest";
import InterestForm from "./interestForm";
import {
  Button,
  Dimmer,
  Header,
  Icon,
  Image,
  Segment
} from "semantic-ui-react";

export default class InterestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { update: false, active: false, formData: null };
    this.handleHide = this.handleHide.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.manageData = this.manageData.bind(this);
  }
  handleShow() {
    this.setState({ active: true });
  }
  handleHide() {
    this.setState({ active: false, update: false });
  }
  manageData(id) {
    this.setState({
      formData: this.props.data.find(x => x.id == id),
      update: true,
      active: true
    });
  }
  componentDidMount() {
    this.props.getDataList();
  }

  render() {
    const { active } = this.state;
    const data_array = this.props.data;
    let that = this;
    const children = data_array.map(function(data) {
      return (
        <Interest data={data} key={data.id} manageData={that.manageData} />
      );
    });
    return (
      <div>
        <h2>Interest</h2>
        <Dimmer.Dimmable as={Segment} dimmed={active}>
          {children}

          <Dimmer active={active} onClickOutside={this.handleHide}>
            <InterestForm
              postData={this.props.postData}
              handleHide={this.handleHide}
              update={this.state.update}
              formData={this.state.formData}
            />
            <Button icon="minus" onClick={this.handleHide} />
          </Dimmer>
        </Dimmer.Dimmable>
        <Button.Group>
          <Button icon="plus" onClick={this.handleShow} />
        </Button.Group>
      </div>
    );
  }
}
