import React, { Component } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Menu } from "semantic-ui-react";

import style from "./../styles.css";

export class AppMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "Interests" };
  }
  render() {
    const { activeItem } = this.state;
    const { theme } = this.props;
    const menu = (
      <div styleName="style.appMenu">
        <BrowserView>
          <Menu size="small" fluid icon="labeled" stackable widths={8}>
            <Menu.Item
              color={theme}
              name="Interests"
              active={activeItem === "Interests"}
              onClick={() => {
                this.props.onMenuClick("interest");
                this.setState({ activeItem: "Interests" });
              }}
            />
            <Menu.Item
              color={theme}
              name="Achievements"
              active={activeItem === "Achievements"}
              onClick={() => {
                this.props.onMenuClick("achievement");
                this.setState({ activeItem: "Achievements" });
              }}
            />
            <Menu.Item
              color={theme}
              name="Education"
              active={activeItem === "Education"}
              onClick={() => {
                this.props.onMenuClick("currentEducation");
                this.setState({ activeItem: "Education" });
              }}
            />
            <Menu.Item
              color={theme}
              name="Experience"
              active={activeItem === "Experience"}
              onClick={() => {
                this.props.onMenuClick("experience");
                this.setState({ activeItem: "Experience" });
              }}
            />
            <Menu.Item
              color={theme}
              name="Projects"
              active={activeItem === "Projects"}
              onClick={() => {
                this.props.onMenuClick("project");
                this.setState({ activeItem: "Projects" });
              }}
            />

            <Menu.Item
              color={theme}
              name="Publications"
              active={activeItem === "Publications"}
              onClick={() => {
                this.props.onMenuClick("book");
                this.setState({ activeItem: "Publications" });
              }}
            />

            <Menu.Item
              color={theme}
              name="References"
              active={activeItem === "References"}
              onClick={() => {
                this.props.onMenuClick("referee");
                this.setState({ activeItem: "References" });
              }}
            />
            <Menu.Item
              color={theme}
              name="Skills"
              active={activeItem === "Skills"}
              onClick={() => {
                this.props.onMenuClick("skill");
                this.setState({ activeItem: "Skills" });
              }}
            />
          </Menu>
        </BrowserView>
      </div>
    );
    return <div> {menu} </div>;
  }
}
