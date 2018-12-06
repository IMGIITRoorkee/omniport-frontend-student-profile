import React, { Component } from "react";
import {
  Segment,
  Header,
  Container,
  Grid,
  GridColumn,
  Icon,
  Image,
  Card
} from "semantic-ui-react";

import { AppHeader, AppFooter, AppMain } from "formula_one";
import app from "./stylesheets/app.css";
import { InterestList } from "./components/interestList";
import { InternshipList } from "./components/internshipList";
import { BookList } from "./components/bookList";
import { PreviousEducationList } from "./components/previousEducationList";
import { CurrentEducationList } from "./components/currentEducationList";
import { AchievementList } from "./components/achievementList";
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
    name: "Darshan Kumawat",
    role: "Designer"
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
          <Container as={Segment} basic>
            <Grid stackable>
              <Grid.Row>
                <Grid.Column width={4}>{CardExampleCard}</Grid.Column>
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
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </AppMain>
        <AppFooter creators={creators} styleName="app.footer" />
      </div>
    );
  }
}

export default App;

const CardExampleCard = (
  <Card fluid>
    {/* <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" /> */}
    <Image
      src="http://localhost:3000/media/kernel/display_pictures/10be0ac9-5dc3-4698-a113-c87e0ab2a088.png"
      fluid
    />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className="date">Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name="user" />
        22 Friends
      </a>
    </Card.Content>
  </Card>
);
