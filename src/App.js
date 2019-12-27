import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Container, Grid, Menu } from "semantic-ui-react";
import { BrowserView, MobileView } from "react-device-detect";

import { AppHeader, AppFooter, AppMain } from "formula_one";

import { Profile } from "./components/profile/profile";
import { Skill } from "./components/skill/skill";
import { AppMenu } from "./components/appMenu";
import { components } from "./constants/genericComponents";

import { listContainers } from "./constants/listContainers";
import { AppPlaceholder } from "./components/placeholders/appPlaceholder";
import { ScrollToTop } from "./components/scrollToTop";

import { creators } from "./constants/creators";
import { fetchAppDetails } from "./actions/appDetails";
import { fetchData } from "./actions/genericActions";

import style from "./styles.css";
let count = 0;
class App extends Component {
  constructor(props) {
    super(props);
    //activeItem is used setting the current compenent under focus
    this.state = {
      activeItem: "Interests"
    };
  }

  componentDidMount() {
    //getting handle from url
    let handle = this.props.match.params.handle;

    //fetchAppDetails will dispatch SET_APP_DETAILS
    this.props.fetchAppDetails(handle);
  }

  scroll = target => {
    let ele = document.getElementById(target);
    window.scrollTo({ top: ele.offsetTop + 30, behavior: "smooth" });
  };

  onMenuClick = componentName => {
    this.scroll(componentName);
  };

  render() {
    const { handle, theme, loading } = this.props.state.appDetails;

    let genericComponentList = [];
    for (let index in components) {
      let componentName = components[index];
        genericComponentList.push(
          <div id={componentName}>
            {React.createElement(listContainers[componentName], {})}
          </div>
        );
    }

    const profile = (
      <Profile handle={handle} theme={theme} changeTheme={this.changeTheme} />
    );

    const skill = (
      <div id="skill">
        <Skill handle={handle} theme={theme} />
      </div>
    );

    const allComponents = (
      <div>
        {genericComponentList}
        {skill}
      </div>
    );
    
    const app = (
      <div styleName="style.wrapper">
        <AppHeader
          appName="Student Profile"
          appLogo={false}
          appLink={`http://${window.location.host}`}
          userDropdown
        />
        <AppMain>
          <div style={{ flexGrow: "1", backgroundColor: "rgb(245, 245, 245)" }}>
            <Container as={Segment} basic>
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column width={4}>{profile}</Grid.Column>
                  <Grid.Column width={12}>
                    <AppMenu theme={theme} onMenuClick={this.onMenuClick} />
                    {allComponents}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
            <ScrollToTop />
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
    fetchAppDetails: handle => {
      dispatch(fetchAppDetails(handle));
    },
    fetchData: (componentName, editMode, handle) =>
      dispatch(fetchData(componentName, editMode, handle))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
