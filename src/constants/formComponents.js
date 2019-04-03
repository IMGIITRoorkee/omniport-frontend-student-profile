import genericFormMaker from "../components/genericFormMaker";
import { specs } from "./specs";

const interestForm = genericFormMaker(specs["interest"]);
const achievementForm = genericFormMaker(specs["achievement"]);
const paperForm = genericFormMaker(specs["paper"]);

export const formComponents = {
  interest: interestForm,
  achievement: achievementForm,
  paper: paperForm
};

const FormComponents = {};
