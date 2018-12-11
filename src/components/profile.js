import React from "react";
import { Card, Icon, Image, Dimmer, Segment } from "semantic-ui-react";
import axios from "axios";
import { getCookie } from "formula_one";
import { LinkDisplay } from "./linkDisplay";
import { ProfileForm } from "./profileForm";

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { handle: "", description: "", customWebsite: false, resume: null },
      person_data: "",
      active: false,
      createNew: true
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = e => {
    const self = this;
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    axios
      .get("/api/student_profile/profile/")
      .then(function(response) {
        console.log(response.data);

        if (response.data.length != 0) {
          console.log("already created");
          self.setState({ data: response.data[0], createNew: false });
        } else {
          self.setState({ createNew: true });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .get("/kernel/who_am_i/")
      .then(function(response) {
        self.setState({ person_data: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleShow = e => {
    this.setState({
      active: true
    });
  };
  handleUpdate = (data, flag) => {
    this.setState({ active: false, data: data, createNew: flag });
  };
  handleHide = () => {
    this.setState({ active: false });
  };

  render() {
    const desc = this.state.data.description;
    console.log(desc);
    return (
      <Card fluid as={Segment}>
        <Card.Header textAlign="right">
          <Icon name="edit" onClick={this.handleShow} />
        </Card.Header>
        <Image
          centered
          src={this.state.person_data.displayPicture}
          size="small"
          circular
        />
        <Card.Content as={Segment}>
          <Card.Header textAlign="center">
            {this.state.person_data.fullName}
          </Card.Header>
          <Card.Meta textAlign="center">@{this.state.data.handle}</Card.Meta>
          <Card.Description textAlign="center"> {desc}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <LinkDisplay />
        </Card.Content>
        <Dimmer active={this.state.active} page>
          <ProfileForm
            data={this.state.data}
            createNew={this.state.createNew}
            handleHide={this.handleHide}
            handleUpdate={this.handleUpdate}
          />
        </Dimmer>
      </Card>
    );
  }
}
