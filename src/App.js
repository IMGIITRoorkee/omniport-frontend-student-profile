import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "axios";
import { Segment, Container, Grid, Menu } from "semantic-ui-react";
import { BrowserView, MobileView } from "react-device-detect";

import { AppHeader, AppFooter, AppMain } from "formula_one";

import { Profile } from "./components/profile/profile";
import { Skill } from "./components/skill/skill";
import { AppMenu } from "./components/appMenu";
import { components } from "./constants/genericComponents";
import { listComponents } from "./constants/listComponents";

import { listContainers } from "./constants/listContainers";
import { AppPlaceholder } from "./components/placeholders/appPlaceholder";

import { creators } from "./constants/creators";
import { fetchAppDetails } from "./actions/appDetails";
import { fetchData } from "./actions/genericActions";

import style from "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //fetching all components' data
    let handleParam = this.props.match.params.handle;
    let editMode = false;
    if (handleParam == undefined) editMode = true;
    this.props.fetchAppDetails(handleParam);
    for (let index in components) {
      let componentName = components[index];
      this.props.fetchData(componentName, editMode, handleParam);
    }
  }

  //needs to be removed
  changeTheme = theme => {
    this.setState({ theme: theme });
  };

  scroll = target => {
    let ele = document.getElementById(target);
    window.scrollTo({ top: ele.offsetTop + 30, behavior: "smooth" });
  };

  onMenuClick = componentName => {
    this.scroll(componentName);
  };

  render() {
    const { loading } = this.props.state.appDetails;
    let { theme, editMode } = this.props.state.appDetails;
    const { appDetails } = this.props.state;
    console.log(editMode);
    const { state } = this.props;

    let genericComponentList = [];
    for (let index in components) {
      let componentName = components[index];
      if (editMode || !state[componentName].isEmpty)
        genericComponentList.push(
          <div id={componentName}>{React.createElement(listContainers[componentName], {})}</div>
        );
    }
    const skill = (
      <div id="skill">
        <Skill handle={appDetails.handleParam} theme={appDetails.theme} />
      </div>
    );
    const allComponents = (
      <div>
        {genericComponentList}
        {skill}
      </div>
    );
    const profile = <Profile handle={appDetails.handleParam} theme={appDetails.theme} changeTheme={this.changeTheme} />;

    const app = (
      <div styleName="style.wrapper">
        <AppHeader appName="Student Profile" appLogo={false} appLink={`http://${window.location.host}`} userDropdown />
        <AppMain>
          {/* to be verified */}
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
