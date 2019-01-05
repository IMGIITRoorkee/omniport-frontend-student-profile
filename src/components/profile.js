import React from "react";
import { Card, Icon, Image, Dimmer, Segment, Label, Button } from "semantic-ui-react";
import axios from "axios";
import { getCookie } from "formula_one";
import { LinkDisplay } from "./linkDisplay";
import { ProfileForm } from "./profileForm";
import { ResumeDownload } from "./resumeDownload";
import { BrowserView, MobileView } from "react-device-detect";
import style from "../styles.css";
import defaultDp from "./../../../../../omniport/formula_one/src/components/default-dp";
import DefaultDp from "./../../../../../omniport/formula_one/src/components/default-dp";
export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        handle: "",
        description: "",
        customWebsite: false,
        resume: null,
        displayPicture: null,
        theme: "teal"
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
    console.log(url);
    axios
      .get("/api/student_profile/profile/" + url)
      .then(response => {
        if (response.data.length != 0) {
          if (this.props.handle == undefined) {
            let data = response.data[0];
            self.setState({ data: data, createNew: false });
          } else {
            let data = response.data;
            console.log(data);
            let person_data = {
              displayPicture: data.displayPicture,
              fullName: data.fullName
            };
            self.setState({
              data: data,
              person_data: person_data,
              createNew: false
            });
          }
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
  handleUpdate = (data, flag, displayPicture) => {
    this.setState({
      active: false,
      data: data,
      createNew: flag,
      person_data: { ...this.state.person_data, displayPicture: displayPicture }
    });
  };
  handleHide = () => {
    this.setState({ active: false });
  };

  render() {
    console.log(this.props);
    console.log(this.state);
    const desc = this.state.data.description;
    const { theme } = this.props;
    const { data, handle, person_data } = this.state;
    const preview = handle == undefined ? false : true;
    const ownHandle = data.handle;
    let imageView = <Image centered src={person_data.displayPicture} size="small" circular />;
    if (person_data.displayPicture == null) {
      imageView = <DefaultDp name={data.student} size={100} />;
    }
    if (data)
      return (
        <div style={{ position: "sticky", top: 0 }}>
          <Card color={theme} fluid>
            {this.props.handle == undefined ? (
              <Card.Content>
                <div styleName="style.headingBox">
                  <h3 styleName="style.heading">Profile </h3>
                  <Icon name="edit" onClick={this.handleShow} color="grey" />
                </div>
              </Card.Content>
            ) : null}
            <Card.Content textAlign="center">{imageView}</Card.Content>
            <Card.Content as={Segment} basic>
              <Card.Header textAlign="center">{data.student}</Card.Header>
              <Card.Meta textAlign="center">
                {this.state.data.handle ? "@" : null}
                {this.state.data.handle}
              </Card.Meta>
              <Card.Description textAlign="center"> {desc}</Card.Description>
            </Card.Content>
            <Card.Content>
              <LinkDisplay handle={this.props.handle} />
            </Card.Content>
            <Dimmer active={this.state.active} page>
              <ProfileForm
                data={this.state.data}
                person_data={this.state.person_data}
                createNew={this.state.createNew}
                handleHide={this.handleHide}
                handleUpdate={this.handleUpdate}
                changeTheme={this.props.changeTheme}
              />
            </Dimmer>
          </Card>

          <ResumeDownload preview={preview} url={data.resume} ownHandle={ownHandle} />
        </div>
      );
  }
}
