import React, { Component } from "react";
import axios from "axios";
import { Segment, Container, Grid, Menu } from "semantic-ui-react";
import { BrowserView, MobileView } from "react-device-detect";

import { AppHeader, AppFooter, AppMain } from "formula_one";

import { Profile } from "./components/profile/profile";
import { Skill } from "./components/skill/skill";
import { listComponents } from "./constants/listComponents";

import { listContainers } from "./constants/listContainers";

import { creators } from "./constants/creators";

import style from "./styles.css";

// import { InterestListContainer } from "./containers/interestList";

const InterestListContainer = listContainers["interest"];
const AchievementListContainer = listContainers["achievement"];
const CurrentEducationListContainer = listContainers["currentEducation"];
const PreviousEducationListContainer = listContainers["previousEducation"];

const AchievementList = listComponents["achievement"];
const CurrentEducationList = listComponents["currentEducation"];
const PreviousEducationList = listComponents["previousEducation"];
const PositionList = listComponents["position"];
const ExperienceList = listComponents["experience"];
const ProjectList = listComponents["project"];
const BookList = listComponents["book"];
const PaperList = listComponents["paper"];
const RefereeList = listComponents["referee"];

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
          if (response.data[0]) this.setState({ theme: response.data[0].theme });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

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
        <BrowserView>
          <Menu size="small" fluid icon="labeled" stackable widths={8}>
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
              name="Education"
              active={activeItem === "Education"}
              onClick={(e, target) => {
                this.handleItemClick;
                this.setState({ activeItem: "Education" });
                this.scroll("currentEducation");
              }}
            />
            <Menu.Item
              color={theme || "blue"}
              name="Experience"
              active={activeItem === "Experience"}
              onClick={(e, target) => {
                this.handleItemClick;
                this.setState({ activeItem: "Experience" });
                this.scroll("experience");
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
              color={theme || "blue"}
              name="References"
              active={activeItem === "References"}
              onClick={(e, target) => {
                this.handleItemClick;
                this.setState({ activeItem: "References" });
                this.scroll("referee");
              }}
            />
          </Menu>
        </BrowserView>
      </div>
    );
    const componentList = (
      <div>
        <div id="interest">
          <InterestListContainer />
        </div>
        <div id="achievement">
          <AchievementListContainer />
        </div>
        <div id="currentEducation">
          <CurrentEducationListContainer />
        </div>
        <div id="previousEducation">
          <PreviousEducationListContainer />
        </div>
        {/* 
     
        <div id="position">
          <PositionList handle={handle} theme={theme} />
        </div>
        <div id="experience">
          <ExperienceList handle={handle} theme={theme} />
        </div>
        <div id="project">
          <ProjectList handle={handle} theme={theme} />
        </div>
        <div id="book">
          <BookList handle={handle} theme={theme} />
        </div>
        <div id="paper">
          <PaperList handle={handle} theme={theme} />
        </div>
        <div id="referee">
          <RefereeList handle={handle} theme={theme} />
        </div> */}

        {/* Skill component along with Profile component are different from the rest */}
        {/*     
        <div id="skill">
          <Skill handle={handle} theme={theme} />
        </div> */}
      </div>
    );

    const profile = <Profile handle={handle} theme={this.state.theme} changeTheme={this.changeTheme} />;

    const app = (
      <div styleName="style.wrapper">
        <AppHeader appName="Student Profile" appLogo={false} appLink={`http://${window.location.host}`} userDropdown />
        <AppMain>
          {/* to be verified */}
          <div style={{ flexGrow: "1", backgroundColor: "rgb(245, 245, 245)" }}>
            <BrowserView>
              <Container as={Segment} basic>
                <Grid stackable>
                  <Grid.Row>
                    <Grid.Column width={4}>{profile}</Grid.Column>
                    <Grid.Column width={12}>
                      {app_menu}
                      {componentList}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </BrowserView>
            <MobileView>
              <Container>
                <Grid stackable>
                  <Grid.Row>
                    <Grid.Column width={4}>{profile}</Grid.Column>
                    <Grid.Column width={12}>{componentList}</Grid.Column>
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
      document.location = "/404";
    } else if (erroneous === "don't know") {
      return null;
    } else return null;
  }
}

export default App;
