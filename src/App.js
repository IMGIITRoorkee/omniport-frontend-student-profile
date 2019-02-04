import React, { Component } from "react";
import { Segment, Container, Grid, Menu } from "semantic-ui-react";
import { BrowserView, MobileView } from "react-device-detect";
import axios from "axios";
import { AppHeader, AppFooter, AppMain } from "formula_one";
import { InterestList } from "./components/interestList";
import { InternshipList } from "./components/internshipList";
import { JobList } from "./components/jobList";
import { BookList } from "./components/bookList";
import { PreviousEducationList } from "./components/previousEducationList";
import { CurrentEducationList } from "./components/currentEducationList";
import { RefereeList } from "./components/refereeList";
import { PaperList } from "./components/paperList";
import { AchievementList } from "./components/achievementList";
import { Profile } from "./components/profile";
import { ProjectForm } from "./components/projectForm";
import { Skill } from "./components/skill";
import { NotFound } from "./components/notFound";
import style from "./styles.css";

const creators = [
  {
    name: "Dhruv Bhanushali",
    role: "Backend Mentor"
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

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "Interests",
      show: false,
      erroneous: "don't know",
      handle: "",
      theme: "blue",
      tVisibility: false
    };
  }
  componentDidMount() {
    const handle = this.props.match.params.handle;
    this.setState({ handle: handle });
    let show;
    if (handle != undefined) {
      show = false;
      this.setState({ show: false });
    } else {
      show = true;
      this.setState({ show: true });
    }
    if (!show) {
      axios
        .get("/api/student_profile/profile/" + handle + "/handle/")
        .then(response => {
          this.setState({ erroneous: "no", theme: response.data.theme });
        })
        .catch(error => {
          console.log(error);
          if (error.response.status == 404) {
            this.setState({ erroneous: "yes" });
          }
        });
    } else {
      axios
        .get("/api/student_profile/profile/")
        .then(response => {
          console.log(response.data);
          if (response.data[0])
            this.setState({ theme: response.data[0].theme });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  handleToggle = () => {
    const newtVisibility = !this.state.tVisibility;
    this.setState({ tVisibility: newtVisibility });
  };
  changeTheme = theme => {
    this.setState({ theme: theme }, () => {});
  };
  scroll = target => {
    let ele = document.getElementById(target);
    window.scrollTo({ top: ele.offsetTop + 30, behavior: "smooth" });
  };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { show, erroneous, handle, activeItem } = this.state;
    let { theme } = this.state;
    if (theme == "zero") theme = null;
    const app_menu = (
      <div
        style={{
          zIndex: "5",
          position: "sticky",
          top: 0,
          backgroundColor: "white"
        }}
      >
        <Menu
          pointing
          secondary
          size="small"
          fluid
          icon="labeled"
          borderless
          stackable
          widths={8}
        >
          <Menu.Item
            color={theme || "blue"}
            name="Interests"
            active={activeItem === "Interests"}
            onClick={(e, target) => {
              this.handleItemClick;
              this.setState({ activeItem: "Interests" });
              this.scroll("interest");
            }}
          />
          <Menu.Item
            color={theme || "blue"}
            name="Achievements"
            active={activeItem === "Achievements"}
            onClick={(e, target) => {
              this.handleItemClick;
              this.setState({ activeItem: "Achievements" });
              this.scroll("achievement");
            }}
          />
          <Menu.Item
            color={theme || "blue"}
            name="Experience"
            active={activeItem === "Internships"}
            onClick={(e, target) => {
              this.handleItemClick;
              this.setState({ activeItem: "Internships" });
              this.scroll("internship");
            }}
          />
          <Menu.Item
            color={theme || "blue"}
            name="Projects"
            active={activeItem === "Projects"}
            onClick={(e, target) => {
              this.handleItemClick;
              this.setState({ activeItem: "Projects" });
              this.scroll("project");
            }}
          />
          <Menu.Item
            color={theme || "blue"}
            name="Skills"
            active={activeItem === "Skills"}
            onClick={(e, target) => {
              this.handleItemClick;
              this.setState({ activeItem: "Skills" });
              this.scroll("skill");
            }}
          />
          <Menu.Item
            color={theme || "blue"}
            name="Publications"
            active={activeItem === "Publications"}
            onClick={(e, target) => {
              this.handleItemClick;
              this.setState({ activeItem: "Publications" });
              this.scroll("book");
            }}
          />
          <Menu.Item
            color={theme}
            name="Education"
            active={activeItem === "Education"}
            onClick={(e, target) => {
              this.handleItemClick;
              this.setState({ activeItem: "Education" });
              this.scroll("currentEducation");
            }}
          />
          <Menu.Item
            color={theme}
            name="References"
            active={activeItem === "References"}
            onClick={(e, target) => {
              this.handleItemClick;
              this.setState({ activeItem: "References" });
              this.scroll("referee");
            }}
          />
        </Menu>
      </div>
    );
    const app = (
      <div styleName="style.wrapper">
        <AppHeader
          appName="student_profile"
          appLogo={false}
          appLink={`http://${window.location.host}`}
          userDropdown
        />
        <AppMain>
          {/* to be verified */}
          <div style={{ flexGrow: "1", backgroundColor: "rgb(245, 245, 245)" }}>
            <BrowserView>
              <Container as={Segment} basic>
                <Grid stackable>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <Profile
                        handle={handle}
                        theme={this.state.theme}
                        changeTheme={this.changeTheme}
                      />
                    </Grid.Column>
                    <Grid.Column width={12}>
                      {app_menu}
                      <div id="interest">
                        <InterestList handle={handle} theme={theme} />
                      </div>
                      <div id="achievement">
                        <AchievementList handle={handle} theme={theme} />
                      </div>
                      <div id="internship">
                        <InternshipList handle={handle} theme={theme} />
                      </div>
                      <div id="job">
                        <JobList handle={handle} theme={theme} />
                      </div>
                      <div id="project">
                        <ProjectForm handle={handle} theme={theme} />
                      </div>
                      <div id="skill">
                        <Skill handle={handle} theme={theme} />
                      </div>
                      <div id="book">
                        <BookList handle={handle} theme={theme} />
                      </div>
                      <div id="paper">
                        <PaperList handle={handle} theme={theme} />
                      </div>
                      <div id="currentEducation">
                        <CurrentEducationList handle={handle} theme={theme} />
                      </div>
                      <div id="previousEducation">
                        <PreviousEducationList handle={handle} theme={theme} />
                      </div>
                      <div id="referee">
                        <RefereeList handle={handle} theme={theme} />
                      </div>
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
                      <Profile
                        handle={handle}
                        theme={this.state.theme}
                        changeTheme={this.changeTheme}
                      />
                    </Grid.Column>
                    <Grid.Column width={12}>
                      <InterestList handle={handle} theme={theme} />
                      <AchievementList handle={handle} theme={theme} />
                      <InternshipList handle={handle} theme={theme} />
                      <JobList handle={handle} theme={theme} />
                      <ProjectForm handle={handle} theme={theme} />
                      <Skill handle={handle} theme={theme} />
                      <BookList handle={handle} theme={theme} />
                      <PaperList handle={handle} theme={theme} />
                      <CurrentEducationList handle={handle} theme={theme} />
                      <PreviousEducationList handle={handle} theme={theme} />
                      <RefereeList handle={handle} theme={theme} />
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
  }
}

export default App;
