import React, { Component } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";

import style from "./../styles.css";

import NavItems from "../constants/navItems";

class AppMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "Interests" };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.updateNavbar);
    this.updateNavbar();
  }

  updateNavbar = () => {
    for (const item of NavItems) {
      for (const subSection of item.id) {
        const element = document.getElementById(subSection);
        if (window.scrollY >= element.offsetTop + 30) {
          this.setState({ activeItem: item.label });
        }
      }
    }
  }

  render() {
    const { activeItem } = this.state;
    const preview = !this.props.data.appDetails.editMode;
    return (
      <div styleName="style.appMenu">
        <BrowserView>
          <Menu tabular size="small" icon="labeled" styleName="style.navBar">
            {NavItems.map(item => {
              let show = false;
              for (const subSection of item.id) {
                if (this.props.data[subSection] && !this.props.data[subSection].isEmpty) {
                  show = true;
                  break;
                }
              }
              if (item.label === "Skills") {
                const skill = document.getElementById("skill");
                show = Boolean(skill && skill.innerText);
              }
              if (!preview || show) {
                return (
                  <Menu.Item
                    id={item.label}
                    key={item.id}
                    href={`#${item.id}`}
                    name={item.label}
                    active={activeItem === item.label}
                    onClick={() => {
                      this.props.onMenuClick(item.id);
                      this.setState({ activeItem: item.label });
                    }}
                    styleName={
                      `navItem ${activeItem === item.label ? "activeNavItem" : ""}`
                    }
                  />
                )
              }
            })}
          </Menu>
        </BrowserView>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state,
  }
}

export default connect(mapStateToProps)(AppMenu);
