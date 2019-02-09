import { List } from "semantic-ui-react";
import genericListMaker from "../components/genericListMaker";
import genericFormMaker from "../components/genericFormMaker";
import { specs } from "./specs";

const components = [
  "interest",
  "achievement",
  "currentEducation",
  "previousEducation",
  "position",
  "paper"
];

const list = {};
for (let i in components) {
  let componentName = components[i];
  let formComponent = genericFormMaker(specs[componentName]);
  list[componentName] = genericListMaker(componentName, formComponent);
}
export const listComponents = list;
