export const specs = {
  interest: {
    fields: [
      {
        group: false,
        name: "topic",
        type: "input_field",
        const_props: {
          name: "topic",
          key: "Topic",
          placeholder: "",
          label: "Topic",
          required: true
        },
        user_props: ["handleChange"]
      }
    ],
    url: "interest",
    name: "Interest"
  }
};
