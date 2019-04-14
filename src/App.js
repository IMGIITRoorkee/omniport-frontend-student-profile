import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "axios";
import { Segment, Container, Grid, Menu } from "semantic-ui-react";
import { BrowserView, MobileView } from "react-device-detect";

import { AppHeader, AppFooter, AppMain } from "formula_one";

import { Profile } from "./components/profile/profile";
import { Skill } from "./components/skill/skill";
import { components } from "./constants/genericComponents";
import { listComponents } from "./constants/listComponents";

import { listContainers } from "./constants/listContainers";
import { AppPlaceholder } from "./components/placeholders/appPlaceholder";

import { creators } from "./constants/creators";
import { fetchAppDetails } from "./actions/appDetails";
import { fetchData } from "./actions/genericActions";

import style from "./styles.css";

// import { InterestListContainer } from "./containers/interestList";

const InterestListContainer = listContainers["interest"];
const AchievementListContainer = listContainers["achievement"];
const CurrentEducationListContainer = listContainers["currentEducation"];
const PreviousEducationListContainer = listContainers["previousEducation"];

const PositionListContainer = listContainers["position"];
const ExperienceListContainer = listContainers["experience"];
const ProjectListContainer = listContainers["project"];
const BookListContainer = listContainers["book"];
const PaperListContainer = listContainers["paper"];
const RefereeListContainer = listContainers["referee"];

class App extends Component {
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
    let handleParam = this.props.match.params.handle;
    let editMode = false;
    if (handleParam == undefined) editMode = true;
    this.props.fetchAppDetails(handleParam);
    setInterval(console.log("0"), 9000);
    for (let index in components) {
      let componentName = components[index];
      console.log("EM", this.props.state.appDetails);
      this.props.fetchData(componentName, editMode, handleParam);
    }
    const handle = handleParam;
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
    const { loading } = this.props.state.appDetails;
    let { theme } = this.props.state.appDetails;

    //make menu generic
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
              color={theme}
              name="Interests"
              active={activeItem === "Interests"}
              onClick={(e, target) => {
                this.handleItemClick;
                this.setState({ activeItem: "Interests" });
                this.scroll("interest");
              }}
            />
            <Menu.Item
              color={theme}
              name="Achievements"
              active={activeItem === "Achievements"}
              onClick={(e, target) => {
                this.handleItemClick;
                this.setState({ activeItem: "Achievements" });
                this.scroll("achievement");
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
              name="Experience"
              active={activeItem === "Experience"}
              onClick={(e, target) => {
                this.handleItemClick;
                this.setState({ activeItem: "Experience" });
                this.scroll("experience");
              }}
            />
            <Menu.Item
              color={theme}
              name="Projects"
              active={activeItem === "Projects"}
              onClick={(e, target) => {
                this.handleItemClick;
                this.setState({ activeItem: "Projects" });
                this.scroll("project");
              }}
            />

            <Menu.Item
              color={theme}
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
              name="References"
              active={activeItem === "References"}
              onClick={(e, target) => {
                this.handleItemClick;
                this.setState({ activeItem: "References" });
                this.scroll("referee");
              }}
            />
            <Menu.Item
              color={theme}
              name="Skills"
              active={activeItem === "Skills"}
              onClick={(e, target) => {
                this.handleItemClick;
                this.setState({ activeItem: "Skills" });
                this.scroll("skill");
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
        <div id="position">
          <PositionListContainer />
        </div>
        <div id="experience">
          <ExperienceListContainer />
        </div>
        <div id="project">
          <ProjectListContainer />
        </div>
        <div id="book">
          <BookListContainer />
        </div>
        <div id="paper">
          <PaperListContainer />
        </div>
        <div id="referee">
          <RefereeListContainer />
        </div>

        {/* Skill component along with Profile component are different from the rest */}
        <div id="skill">
          <Skill handle={this.props.state.appDetails.handleParam} theme={this.props.state.appDetails.theme} />
        </div>
      </div>
    );

    const profile = (
      <Profile
        handle={this.props.state.appDetails.handleParam}
        theme={this.props.state.appDetails.theme}
        changeTheme={this.changeTheme}
      />
    );

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
    if (loading) return <AppPlaceholder />;
    else return app;
  }
}

//modify state
const mapStateToProps = state => {
  return { state: state };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchAppDetails: handleParam => {
      dispatch(fetchAppDetails(handleParam));
    },
    fetchData: (componentName, editMode, handleParam) => dispatch(fetchData(componentName, editMode, handleParam))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
