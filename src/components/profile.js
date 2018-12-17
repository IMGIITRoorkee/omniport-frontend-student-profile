import React from "react";
import {
  Card,
  Icon,
  Image,
  Dimmer,
  Segment,
  Label,
  Button
} from "semantic-ui-react";
import axios from "axios";
import { getCookie } from "formula_one";
import { LinkDisplay } from "./linkDisplay";
import { ProfileForm } from "./profileForm";
import { ResumeDownload } from "./resumeDownload";
import { BrowserView, MobileView } from "react-device-detect";
import style from "../styles.css";
export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        handle: "",
        description: "",
        customWebsite: false,
        resume: null,
        displayPicture: null
      },
      person_data: "",
      active: false,
      createNew: true,
      handle: props.handle,
      image: null
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
    let url = "";
    if (this.props.handle != undefined) url = this.props.handle + "/handle/";
    console.log("url", url);
    axios
      .get("/api/student_profile/profile/" + url)
      .then(response => {
        if (response.data.length != 0) {
          let data =
            this.props.handle != undefined ? response.data : response.data[0];
          self.setState({ data: data, createNew: false });
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
    const { data } = this.state;
    const { handle } = this.state;
    const preview = handle == undefined ? false : true;
    const ownHandle = data.handle;
    return (
      <div style={{ position: "sticky", top: 0 }}>
        <Card fluid color="teal">
          <Card.Header textAlign="right">
            <Segment styleName="style.headingBox" basic>
              <h3 styleName="style.heading">Profile </h3>
              <Icon name="edit" onClick={this.handleShow} color="grey" />
            </Segment>
          </Card.Header>
          <Image
            centered
            src={this.state.person_data.displayPicture}
            size="small"
            circular
            wrapped
          />
          <Card.Content as={Segment} basic>
            <Card.Header textAlign="center">
              {this.state.person_data.fullName} sadf
            </Card.Header>
            <Card.Meta textAlign="center">
              {this.state.data.handle ? "@" : null}
              {this.state.data.handle}
            </Card.Meta>
            <Card.Description textAlign="center"> {desc}</Card.Description>
          </Card.Content>
          <Card.Content>
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

        <ResumeDownload
          preview={preview}
          url={data.resume}
          ownHandle={ownHandle}
        />
      </div>
    );
  }
}
