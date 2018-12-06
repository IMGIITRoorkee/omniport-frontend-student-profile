import React from "react";
import { Card, Icon, Image} from "semantic-ui-react";
import axios from "axios";

import {LinkDisplay} from "./linkDisplay";


export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data:'',
                   person_data:'',
                   active:false};
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = e => {
    const self = this;
    axios
      .get("/api/student_profile/profile/")
      .then(function(response) {
        console.log(response.data);
        self.setState({ data: response.data[0] });
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
      active: true,
    });
  };
  handleHide = e => {
    this.setState({ active: false });
  };

  render() {
    const desc = this.state.data.description;
    console.log();
    return(
      <Card>
         <Card.Header textAlign="right"><Icon name="write"/></Card.Header>
    <Image src={this.state.person_data.displayPicture} size="medium" circular/>
    <Card.Content>
      <Card.Header textAlign="center">{this.state.person_data.fullName}</Card.Header>
      <Card.Description textAlign="center"> {desc}</Card.Description>
    </Card.Content>
    <Card.Content extra>
     <LinkDisplay/>
    </Card.Content>
  </Card>
    );

  }
}
