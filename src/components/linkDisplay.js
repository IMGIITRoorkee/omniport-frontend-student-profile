import React from "react";
import axios from "axios";
import { LinkForm } from "./linkForm";
import { Segment, Dimmer, Icon, Container } from "semantic-ui-react";
import style from "./../styles.css";

export class LinkDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      active: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }
  updateData = data => {
    this.setState({ data: data });
  };
  fetchData = () => {
    const self = this;
    axios
      .get("/api/student_profile/social_link/")
      .then(function(response) {
        self.setState({ data: Array.from(response.data) });
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
  handleUpdate = data => {
    this.setState({
      data: data,
      active: false
    });
  };
  render() {
    console.log("link handle", this.props.handle);
    const data = this.state.data;
    const children = Array.from(data).map(function(child, index) {
      return (
        <a href={child.url} target="_blank" key={index}>
          <Icon size="big" key={index} name={SOCIAL_SITE_ICONS[child.site]} />
        </a>
      );
    });
    return (
      <div>
        {this.props.handle === undefined ? (
          <div styleName="style.headingBox">
            <h4 styleName="style.heading">Social Media</h4>
            <Icon color="grey" name="add" onClick={this.handleShow} />
          </div>
        ) : null}

        <Segment basic textAlign="center" style={{ margin: "0" }}>
          {children}
        </Segment>
        <Dimmer active={this.state.active} page>
          <LinkForm data={data} handleUpdate={this.handleUpdate} />
        </Dimmer>
      </div>
    );
  }
}

const SOCIAL_SITE_ICONS = {
  beh: "behance",
  blo: "blogger",
  dri: "dribble",
  fac: "facebook",
  fli: "flickr",
  git: "github",
  goo: "google",
  lin: "linkedin",
  med: "medium",
  pin: "pinterest",
  red: "reddit",
  sky: "skype",
  sna: "snapchat",
  tum: "tumblr",
  twi: "twitter",
  you: "youtube",
  oth: "globe"
};
