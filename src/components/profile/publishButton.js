import React, { Component } from "react";
import { Button, Icon } from "semantic-ui-react";
import { toast } from "react-semantic-toasts";

import axios from "axios";
import { getCookie } from "formula_one";

class publishButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
    };
  }

  publishPage = () => {
    const { handle } = this.props;
    const websiteLink = `https://students.iitr.ac.in/${handle}.html`;
    this.setState({ status: true });
    axios.get("/api/student_profile/publish/").then((res) => {
      if (res.status === 200) {
        let headers = {
          "X-CSRFToken": getCookie("csrftoken"),
        };
        const data = {
          handle: handle,
        };
        axios({
          method: "post",
          url: "/api/student_profile/publish/",
          data: data,
          headers: headers,
        })
          .then((res) => {
            this.setState({ status: false });
            if (res.status === 200) {
              toast({
                type: "success",
                title: "Success",
                icon: "smile outline",
                description: (
                  <div>
                    Your page will be published soon.
                    <br />
                    You can visit your page:{" "}
                    <a target='_blank' href={websiteLink}> {websiteLink} </a>.
                  </div>
                ),
                animation: "fade up",
                time: 10000,
              });
            }
          })
          .catch((err) => {
            this.setState({ status: false });
            toast({
              type: 'error',
              title: 'Error occured',
              icon: 'frown outline',
              description: 'Please try again later',
              animation: 'fade up',
              time: 10000,
            });
          });
      }
    });
  };

  render() {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: this.props.isMobile ? "0em" : "0.5em"
        }}
      >
        <Button
          color="blue"
          loading={this.state.status}
          onClick={this.publishPage}
        >
          <Icon name="cloud upload" />
          Publish
        </Button>
      </div>
    );
  }
}

export default publishButton;
