import React from "react";
import axios from "axios";
import { Segment, Icon } from "semantic-ui-react";
import style from "../stylesheets/bookForm.css";

export class Resume extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Segment styleName="style.resume">
        <h5 styleName="style.resumeText">{this.props.resume}</h5>
        <Icon name="delete" color="red" onClick={this.props.handleDelete} />
      </Segment>
    );
  }
}
