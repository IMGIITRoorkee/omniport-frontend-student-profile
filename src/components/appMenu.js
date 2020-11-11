import React, { Component } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Menu } from "semantic-ui-react";

import style from "./../styles.css";

import NavItems from "../constants/navItems";

export class AppMenu extends Component {
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
      const element = document.getElementById(item.id);
      if (window.scrollY >= element.offsetTop + 30) {
        this.setState({ activeItem: item.label });
      }
    }
  }

  render() {
    const { activeItem } = this.state;
    const { theme } = this.props;
    return (
      <div styleName="style.appMenu">
        <BrowserView>
          <Menu size="small" fluid icon="labeled" stackable widths={8}>
            {NavItems.map(item => (
              <Menu.Item
                id={item.label}
                key={item.id}
                href={`#${item.id}`}
                color={theme}
                name={item.label}
                active={activeItem === item.label}
                onClick={() => {
                  this.props.onMenuClick(item.id);
                  this.setState({ activeItem: item.label });
                }}
              />
            ))}
          </Menu>
        </BrowserView>
      </div>
    );
  }
}
