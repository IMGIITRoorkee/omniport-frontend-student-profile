import React from "react";
import axios from "axios";
import { Segment, Icon } from "semantic-ui-react";
import style from "../styles.css";

export class Resume extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {name} = this.props;
    return (
      <Segment styleName="style.headingBox">
        <h5 styleName="style.heading">Remove {name}</h5>
        <Icon name="delete" color="red" onClick={this.props.handleDelete} />
      </Segment>
    );
  }
}
