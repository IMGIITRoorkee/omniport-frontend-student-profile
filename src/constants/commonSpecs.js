//Common fields to be added in each section.
export default [
  {
    group: false,
    name: "visibility",
    type: "boolean_field",
    const_props: {
      name: "visibility",
      key: "Visibility",
      label: "Visible to others",
      required: false,
    },
    user_props: ["handleChange"],
  },
];

export const priority = {
  group: false,
  name: "priority",
  type: "input_field",
  const_props: {
    width: "6",
    name: "priority",
    key: "Priority",
    label: "Priority",
    placeholder: "Priority",
    required: false,
  },
  user_props: ["handleChange"],
}
