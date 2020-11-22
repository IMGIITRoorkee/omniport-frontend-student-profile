import React from "react";
import { Card, Icon, Image, Dimmer, Segment, Label, Button } from "semantic-ui-react";
import Helmet from "react-helmet";

import axios from "axios";

import DefaultDP from "../../../../../formula_one/src/components/default-dp";
import { getCookie } from "formula_one";

import { LinkDisplay } from "../link/linkDisplay";
import { ProfileForm } from "./profileForm";
import { ResumeDownload } from "./resumeDownload";

import { BrowserView, MobileView } from "react-device-detect";

import style from "../../styles.css";

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        handle: "",
        description: "",
        student: "",
        enrolmentNumber: null,
        customWebsite: false,
        resume: null,
        displayPicture: null,
        theme: "blue"
      },
      loading: true,
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
    let person_promise = Promise.resolve(1);
    if (this.props.handle == undefined) {
      person_promise = axios
        .get("/kernel/who_am_i/")
        .then(function (response) {
          self.setState({ person_data: response.data });
        })
        .catch(function (error) {
          // console.error(error);
        });
    }
    let faculty_promise = axios
      .get("/api/student_profile/profile/" + url)
      .then(response => {
        if (response.data.length != 0) {
          if (this.props.handle == undefined) {
            let data = response.data[0];
            self.setState({ data: data, createNew: false });
          } else {
            let data = response.data;
            let person_data = {
              displayPicture: data.displayPicture,
              fullName: data.fullName,
              enrolmentNumber: data.enrolmentNumber,
              description: data.description
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
      .catch(function (error) {
        // console.error(error);
      });
    Promise.all([person_promise, faculty_promise]).then(() => this.setState({ loading: false }));
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

    let { theme } = this.props;
    if (theme == "zero") theme = null;
    const { data, handle, person_data, loading } = this.state;
    const preview = handle == undefined ? false : true;
    const ownHandle = data.enrolmentNumber;
    const style = {
      boxShadow: "0 0 0 1px #d4d4d5,0 2px 0 0 #d4d4d5,0 1px 3px 0 #d4d4d5"
    };
    let imageView = <Image centered src={person_data.displayPicture} size="small" circular />;
    if (!loading && data.student != "" && person_data.displayPicture == null) {
      imageView = <DefaultDP gravatarHash={person_data.gravatarHash} name={data.student} size={"7em"}/>
    }
    if (data)
      return (
        <div style={{ position: "sticky", top: 0 }}>
          {preview && (
            <Helmet>
              <title>{person_data.fullName}</title>

              {/* Google  */}
              <meta name="author" content={person_data.fullName} />
              <meta name="description" content={person_data.description} />
              <meta
                name="keywords"
                content={`${person_data.fullName}, IIT Roorkee, IITR`}
              />

              {/* Open graph */}
              <meta property="og:title" content={person_data.fullName} />
              <meta property="og:type" content="portfolio" />
              {person_data.displayPicture && (
                <meta
                  property="og:image"
                  content={person_data.displayPicture}
                />
              )}
              <meta property="og:description" content={person_data.description} />
              <meta
                property="og:url"
                content={`https://students.iitr.ac.in/${person_data.enrolmentNumber}`}
              />

              {/* Twitter */}
              <meta name="twitter:card" content="summary_large_image" />
              {person_data.displayPicture && (
                <meta
                  name="twitter:image"
                  content={person_data.displayPicture}
                />
              )}
              <meta name="twitter:title" content={person_data.fullName} />
              <meta name="twitter:description" content={person_data.description} />
              <meta
                name="twitter:url"
                content={`https://students.iitr.ac.in/${person_data.enrolmentNumber}`}
              />
            </Helmet>
          )}

          <Card as={Segment} color={theme} style={style} fluid>
            {this.props.handle == undefined ? (
              <Card.Content>
                <div styleName="style.headingBox">
                  <h3 styleName="style.heading" />
                  <Icon name="edit" onClick={this.handleShow} color="grey" />
                </div>
              </Card.Content>
            ) : null}
            <div className="center aligned content"
              style={{ border: "0", textAlign: "center" }}>
              {imageView}
            </div>
            <div className="center aligned content"
              style={{ border: "0", textAlign: "center" }}>
              <Card.Header textAlign="center">{data.student}</Card.Header>
              <Card.Meta textAlign="center">
                {this.state.data.handle ? "@" : null}
                {this.state.data.handle}
              </Card.Meta>
              <Card.Description textAlign="center"> {data.description}</Card.Description>
            </div>
            <div className="center aligned content" style={{ border: "0", textAlign: "center" }}>
              <LinkDisplay handle={this.props.handle} theme={this.props.theme} />
            </div>
            <Dimmer active={this.state.active} page>
              <ProfileForm
                theme={this.props.theme}
                data={this.state.data}
                person_data={this.state.person_data}
                createNew={this.state.createNew}
                handleHide={this.handleHide}
                handleUpdate={this.handleUpdate}
                changeTheme={this.props.changeTheme}
              />
            </Dimmer>
          </Card>

          <ResumeDownload
            preview={preview}
            url={data.resume}
            ownHandle={ownHandle}
            theme={theme}
          />
        </div>
      );
  }
}
