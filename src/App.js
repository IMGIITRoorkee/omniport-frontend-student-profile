import React, { Component } from "react";

import { AppHeader, AppFooter } from "formula_one";

import "./App.css";

const creators = [
  {
    name: "Dhruv Bhanushali",
    role: "Mentor"
  },
  {
    name: "Gaurav Kumar",
    role: "Frontend Developer"
  },
  {
    name: "Praduman Goyal",
    role: "Frontend Developer"
  }
];
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <AppHeader
          appName="SHP"
          appLogo={false}
          appLink={`http://${window.location.host}`}
          userDropdown
        />
        <AppFooter creators={creators} />
      </div>
    );
  }
}

export default App;
