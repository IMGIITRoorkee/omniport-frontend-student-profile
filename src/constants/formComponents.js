import genericFormMaker from "../components/genericFormMaker";
import { specs } from "./specs";

const interestForm = genericFormMaker(specs["interest"]);

export const formComponents = {
  interest: interestForm
};
