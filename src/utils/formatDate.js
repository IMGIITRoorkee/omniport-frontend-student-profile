import moment from "moment";

export const formatDate = someDate => {
  if (someDate == null) return "Present";
  return moment(someDate).format("Do MMM YYYY");
};
