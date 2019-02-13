import React from "react";
import axios from "axios";
import { Segment, Icon } from "semantic-ui-react";

import style from "../styles.css";

export class Link extends React.Component {
  constructor(props) {
    super(props);
  }
  handleDelete = () => {
    this.props.handleUpdateDelete(this.props.data.id);
  };
  render() {
    return (
      <Segment styleName="style.headingBox">
        <div styleName="style.socialBox">
          <Icon name={SOCIAL_SITE_ICONS[this.props.data.site]} />
          <p styleName="style.link">{this.props.data.url}</p>
        </div>
        <Icon name="delete" onClick={this.handleDelete} />
      </Segment>
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
