import React, { Component } from "react";
import { Segment, Header, Container, Grid, Label } from "semantic-ui-react";
import { BrowserView, MobileView } from "react-device-detect";
import axios from "axios";
import { AppHeader, AppFooter, AppMain } from "formula_one";
import app from "./stylesheets/app.css";
import { InterestList } from "./components/interestList";
import { InternshipList } from "./components/internshipList";
import { BookList } from "./components/bookList";
import { PreviousEducationList } from "./components/previousEducationList";
import { CurrentEducationList } from "./components/currentEducationList";
import { AchievementList } from "./components/achievementList";
import { LinkDisplay } from "./components/linkDisplay";
import { LinkForm } from "./components/linkForm";
import { Profile } from "./components/profile";
import { ProjectForm } from "./components/projectForm";
import { skill, Skill } from "./components/skill";
import { NotFound } from "./components/notFound";
import style from "./stylesheets/bookForm.css";
const creators = [
  {
    name: "Mahip Jain",
    role: "Mentor"
  },
  {
    name: "Dhruv Bhanushali",
    role: "Backend Mentor"
  },

  {
    name: "Gaurav Kumar",
    role: "Frontend Mentor"
  },
  {
    name: "Praduman Goyal",
    role: "Frontend Mentor"
  },
  {
    name: "Ajay Neethi Kannan",
    role: "Developer"
  },
  {
    name: "Shreyansh Jain",
    role: "Developer"
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false, erroneous: "don't know", handle: "" };
  }
  componentDidMount() {
    const handle = this.props.match.params.handle;
    this.setState({ handle: handle });
    let show;
    if (handle != undefined) {
      show = false;
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
    if (!show) {
      axios
        .get("/api/student_profile/profile/" + handle + "/handle/")
        .then(response => {
          this.setState({ erroneous: "no" });
        })
        .catch(error => {
          console.log(error);
          if (error.response.status == 404) {
            this.setState({ erroneous: "yes" });
          }
        });
    }
  }
  render() {
    const { show, erroneous, handle } = this.state;
    const app = (
      <div styleName="app.wrapper">
        <AppHeader
          appName="student_profile"
          appLogo={false}
          appLink={`http://${window.location.host}`}
          userDropdown
        />
        <AppMain>
          <div style={{ flexGrow: "1", backgroundColor: "rgb(245, 245, 245)" }}>
            <BrowserView>
              <Container as={Segment} basic>
                <Segment
                  basic
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap"
                  }}
                >
                  {" "}
                  <Segment attached styleName="style.navElement">
                    <h3>Achievements</h3>
                  </Segment>
                  <Segment attached styleName="style.navElement">
                    <h3>Interests</h3>
                  </Segment>
                  <Segment attached styleName="style.navElement">
                    <h3>Internships</h3>
                  </Segment>
                  <Segment attached styleName="style.navElement">
                    <h3>Books</h3>
                  </Segment>
                  <Segment attached styleName="style.navElement">
                    <h3>Current education</h3>
                  </Segment>
                  <Segment attached styleName="style.navElement">
                    <h3>Previous Education</h3>
                  </Segment>
                  <Segment attached styleName="style.navElement">
                    <h3>Projects</h3>
                  </Segment>
                  <Segment attached styleName="style.navElement">
                    <h3>Skills</h3>
                  </Segment>
                </Segment>
                <Grid stackable>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <Profile />
                    </Grid.Column>
                    <Grid.Column width={12}>
                      <InterestList handle={handle} />
                      <AchievementList handle={handle} />
                      <InternshipList handle={handle} />
                      <BookList handle={handle} />
                      <CurrentEducationList handle={handle} />
                      <PreviousEducationList handle={handle} />
                      <ProjectForm />
                      <Skill handle={handle} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </BrowserView>
            <MobileView>
              <Container>
                <Grid stackable>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <Profile />
                    </Grid.Column>
                    <Grid.Column width={12}>
                      <Segment color="red">
                        <Segment basic>
                          <Header as="h2">About me</Header>
                          Electrical Engineering undergraduate, exploring Web
                          Development and having an interest in Mathematics
                        </Segment>
                      </Segment>
                      <InterestList />
                      <AchievementList />
                      <InternshipList />
                      <BookList /> <ProjectForm />
                      <CurrentEducationList />
                      <PreviousEducationList />
                      <Skill />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </MobileView>
          </div>
        </AppMain>
        <AppFooter creators={creators} />
      </div>
    );
    if (show) {
      return app;
    } else if (erroneous == "no") {
      return app;
    } else if (erroneous === "yes") {
      return <NotFound />;
    } else if (erroneous === "don't know") {
      return null;
    } else return null;
    console.log(this.state.show);
  }
}

export default App;
