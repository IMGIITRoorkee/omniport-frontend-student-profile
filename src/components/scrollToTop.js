import React from "react";
import { Icon } from "semantic-ui-react";

import style from "../styles.css";

export const ScrollToTop = props => {
  return (
    <Icon
      styleName="scrollToTopBtn"
      name="arrow up"
      size="big"
      color="grey"
      onClick={() => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      }}
    />
  );
};
