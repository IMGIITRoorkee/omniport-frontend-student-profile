import React from "react";
import axios from "axios";
import { Segment, Icon } from "semantic-ui-react";

export class Resume extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Segment>
        <h5>{this.props.resume}</h5>
        <Icon
          name="delete"
          circular
          color="red"
          onClick={this.props.handleDelete}
        />
      </Segment>
    );
  }
}
