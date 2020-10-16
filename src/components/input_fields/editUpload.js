import React from "react";
import axios from "axios";
import { Segment, Icon } from "semantic-ui-react";
import style from "../../styles.css";

export class EditUpload extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name , disabled } = this.props;
    return (
      <Segment styleName="style.headingBox">
        <h5 styleName="style.heading">Remove {name}</h5>
          { !disabled && <Icon name="delete" color="red" onClick={this.props.handleDelete} /> }
      </Segment>
    );
  }
}
