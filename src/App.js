import React, { Component } from "react";
import { Segment, Header, Container, Grid } from "semantic-ui-react";

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
  }
  render() {
    return (
      <div styleName="app.wrapper">
        <AppHeader
          appName="student_profile"
          appLogo={false}
          appLink={`http://${window.location.host}`}
          userDropdown
        />
        <AppMain>
          <div style={{ flexGrow: "1", backgroundColor: "rgb(245, 245, 245)" }}>
            <Container as={Segment} basic>
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Profile />
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Segment attached="top">
                      <Segment basic>
                        <Header as="h2">About me</Header>
                        Electrical Engineering undergraduate, exploring Web
                        Development and having an interest in Mathematics.
                      </Segment>
                    </Segment>
                    <InterestList />
                    <AchievementList />
                    <InternshipList />
                    <BookList />
                    <CurrentEducationList />
                    <PreviousEducationList />
                    <ProjectForm />
                    <Skill />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div>
        </AppMain>
        <AppFooter creators={creators} />
      </div>
    );
  }
}

export default App;
