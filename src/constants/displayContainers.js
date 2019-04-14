import React from "react";
import { connect } from "react-redux";

import { components } from "./genericComponents";

import Interest from "../components/displayComponents/interest";
import Achievement from "../components/displayComponents/achievement";
import CurrentEducation from "../components/displayComponents/currentEducation";
import PreviousEducation from "../components/displayComponents/previousEducation";
import Position from "../components/displayComponents/position";
import Experience from "../components/displayComponents/experience";
import Project from "../components/displayComponents/project";
import Book from "../components/displayComponents/book";
import Paper from "../components/displayComponents/paper";
import Referee from "../components/displayComponents/referee";

//can use eval() method to reduce the code
export const displayComponents = {
  interest: Interest,
  achievement: Achievement,
  currentEducation: CurrentEducation,
  previousEducation: PreviousEducation,
  position: Position,
  experience: Experience,
  project: Project,
  book: Book,
  paper: Paper,
  referee: Referee
};

const mapStateToProps = state => {
  return { appDetails: state.appDetails };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const list = {};
for (let index in components) {
  let componentName = components[index];
  // this was giving blank screen for sometime
  // let displayComponent = import(`../components/displayComponents/${componentName}`);
  let displayComponent = displayComponents[componentName];
  list[componentName] = connect(
    mapStateToProps,
    mapDispatchToProps
  )(displayComponent);
}
export const displayContainers = list;
