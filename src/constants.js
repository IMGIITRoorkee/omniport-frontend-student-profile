import BooleanField from "./components/input_fields/boolean-field";
import ChoiceField from "./components/input_fields/choice-field";
import DateField from "./components/input_fields/date-field";
import EmailField from "./components/input_fields/email-field";
import IntegerField from "./components/input_fields/integer-field";
import ReadField from "./components/input_fields/read-field";
import TextField from "./components/input_fields/text-field";
import TextAreaField from "./components/input_fields/textarea-field";
import YearField from "./components/input_fields/year-field";
import FileField from "./components/input_fields/fileField";

export const FieldMap = {
    boolean_field: BooleanField,
    choice_field: ChoiceField,
    date_field: DateField,
    email_field: EmailField,
    integer_field: IntegerField,
    read_field: ReadField,
    input_field: TextField,
    text_area_field: TextAreaField,
    year_field: YearField,
    file_field: FileField
  };

export const achievementSpecs = {
  fields:[ {
    name: "achievement",
    type: "input_field",
    const_props: {
      name: "achievement",
      key:"Achievement",
      placeholder: "",
      label: "Achievement",
      required: true
    },
    user_props: ["handleChange"]
  }
  ],

  initial: {
    id: -1,
    achievement:""
  },
  url: "achievement",
  name:"Achievement"
};

export const currentEducationSpecs = {
  fields:[],
  group_fields: [{
    widths:"equal",
    fields: [
      {
        name: "semesterNumber",
        type: "input_field",
        const_props: {
          name: "semesterNumber",
          key:"SemesterNumber",
          placeholder: "",
          label: "Semester number",
          required: true
        },
        user_props: ["handleChange"]
      },
      {
        name: "cgpa",
        type: "input_field",
        const_props: {
          name: "cgpa",
          key:"CGPA",
          placeholder: "",
          label: "CGPA",
          required: true
        },
        user_props: ["handleChange"]
      },
      {
        name: "sgpa",
        type: "input_field",
        const_props: {
          name: "sgpa",
          key:"SGPA",
          placeholder: "",
          label: "SGPA",
          required: true
        },
        user_props: ["handleChange"]
      }
  ]
  }
  ]
  ,
  url: "current_education",
  name:"Current education"
};

export const graduationOptions = [
  { text: "MATRICULATE", key: "MATRICULATE", value: "mat" },
  { text: "INTERMEDIATE", key: "INTERMEDIATE", value: "int" },
  { text: "ASSOCIATE", key: "ASSOCIATE", value: "ass" },
  { text: "GRADUATE", key: "GRADUATE", value: "gra" },
  { text: "POSTGRADUATE", key: "POSTGRADUATE", value: "pos" },
  { text: "DOCTORATE", key: "DOCTORATE", value: "doc" },
  { text: "POSTDOCTORATE", key: "POSTDOCTORATE", value: "pdo" }
];