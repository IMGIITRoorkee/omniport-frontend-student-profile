import genericListMaker from "../components/genericListMaker";
import genericFormMaker from "../components/genericFormMaker";
import { components } from "./genericComponents";
import { specs } from "./specs";

const list = {};
for (let i in components) {
  let componentName = components[i];
  let formComponent = genericFormMaker(specs[componentName]);
  list[componentName] = genericListMaker(componentName, formComponent);
}
export const listComponents = list;
