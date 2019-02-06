import BooleanField from "./../components/input_fields/boolean-field";
import ChoiceField from "./../components/input_fields/choice-field";
import DateField from "./../components/input_fields/date-field";
import EmailField from "./../components/input_fields/email-field";
import IntegerField from "./../components/input_fields/integer-field";
import ReadField from "./../components/input_fields/read-field";
import TextField from "./../components/input_fields/text-field";
import TextAreaField from "./../components/input_fields/textarea-field";
import YearField from "./../components/input_fields/year-field";
import FileField from "./../components/input_fields/fileField";

const graduationOptions = [
  { text: "MATRICULATE", key: "MATRICULATE", value: "mat" },
  { text: "INTERMEDIATE", key: "INTERMEDIATE", value: "int" },
  { text: "ASSOCIATE", key: "ASSOCIATE", value: "ass" },
  { text: "GRADUATE", key: "GRADUATE", value: "gra" },
  { text: "POSTGRADUATE", key: "POSTGRADUATE", value: "pos" },
  { text: "DOCTORATE", key: "DOCTORATE", value: "doc" },
  { text: "POSTDOCTORATE", key: "POSTDOCTORATE", value: "pdo" }
];

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
  file_field: FileField,
  choice_field: ChoiceField
};

export const achievementSpecs = {
  fields: [
    {
      group: false,
      name: "achievement",
      type: "input_field",
      const_props: {
        name: "achievement",
        key: "Achievement",
        placeholder: "",
        label: "Achievement",
        required: true
      },
      user_props: ["handleChange"]
    }
  ],

  url: "achievement",
  name: "Achievement"
};
export const refereeSpecs = {
  fields: [
    {
      group: true,
      widths: "equal",
      fields: [
        {
          name: "referee",
          type: "input_field",
          const_props: {
            name: "referee",
            key: "Referee",
            placeholder: "",
            label: "Referee",
            required: true
          },
          user_props: ["handleChange"]
        },
        {
          name: "designation",
          type: "input_field",
          const_props: {
            name: "designation",
            key: "Designation",
            placeholder: "",
            label: "Designation",
            required: true
          },
          user_props: ["handleChange"]
        }
      ]
    },
    {
      group: false,
      name: "institute",
      type: "input_field",
      const_props: {
        name: "institute",
        key: "Institute",
        placeholder: "",
        label: "Institute",
        required: true
      },
      user_props: ["handleChange"]
    },
    {
      group: false,
      name: "phone",
      type: "input_field",
      const_props: {
        name: "phone",
        key: "Phone",
        placeholder: "",
        label: "Phone",
        required: false
      },
      user_props: ["handleChange"]
    },
    {
      group: false,
      name: "me",
      type: "input_field",
      const_props: {
        name: "email",
        key: "email",
        placeholder: "",
        label: "Email",
        required: true
      },
      user_props: ["handleChange"]
    }
  ],

  url: "referee",
  name: "Reference"
};
export const interestSpecs = {
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
};

export const currentEducationSpecs = {
  fields: [
    {
      group: true,
      widths: "equal",
      fields: [
        {
          name: "semester",
          type: "input_field",
          const_props: {
            name: "semester",
            key: "Semester",
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
            key: "CGPA",
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
            key: "SGPA",
            placeholder: "",
            label: "SGPA",
            required: true
          },
          user_props: ["handleChange"]
        }
      ]
    }
  ],
  url: "current_education",
  name: "Current education"
};

export const paperSpecs = {
  fields: [
    {
      group: false,
      name: "title",
      type: "input_field",
      const_props: {
        name: "title",
        key: "Title",
        placeholder: "Enter the title of the book",
        label: "Title",
        required: true
      },
      user_props: ["handleChange"]
    },
    {
      group: false,
      name: "journal",
      type: "input_field",
      const_props: {
        name: "journal",
        key: "Journal",
        placeholder: "Enter the name of the journal",
        label: "Journal",
        required: true
      },
      user_props: ["handleChange"]
    },
    {
      group: false,
      name: "authors",
      type: "input_field",
      const_props: {
        name: "authors",
        key: "Author",
        placeholder: "Enter the authors of the book",
        label: "Authors",
        required: true
      },
      user_props: ["handleChange"]
    },
    {
      group: false,
      name: "publisher",
      type: "input_field",
      const_props: {
        name: "publisher",
        key: "Publisher",
        placeholder: "Enter the publisher of the book",
        label: "Publisher",
        required: true
      },
      user_props: ["handleChange"]
    },
    {
      group: false,
      name: "year",
      type: "year_field",
      const_props: {
        name: "year",
        key: "year",
        placeholder: "Enter the year of writing the book",
        label: "Year",
        required: true
      },
      user_props: ["handleChange"]
    },
    {
      group: true,
      widths: "equal",
      fields: [
        {
          name: "pages",
          type: "input_field",
          const_props: {
            name: "pages",
            key: "Pages",
            placeholder: "Number of pages",
            label: "Pages",
            required: false
          },
          user_props: ["handleChange"]
        },
        {
          name: "volumes",
          type: "input_field",
          const_props: {
            name: "volumes",
            key: "Volumes",
            placeholder: "Number of volumes",
            label: "Volumes",
            required: false
          },
          user_props: ["handleChange"]
        }
      ]
    },
    {
      group: false,
      name: "paper",
      type: "file_field",
      const_props: {
        name: "paper",
        key: "Paper",
        placeholder: "",
        label: "paper",
        required: false
      },
      user_props: ["handleFile", "handleDelete"]
    }
  ],
  url: "paper",
  name: "Paper"
};

export const internSpecs = {
  fields: [
    {
      group: false,
      name: "position",
      type: "input_field",
      const_props: {
        name: "position",
        key: "Position",
        placeholder: "",
        label: "Position",
        required: true
      },
      user_props: ["handleChange"]
    },
    {
      group: false,
      name: "organisation",
      type: "input_field",
      const_props: {
        name: "organisation",
        key: "Organisation",
        placeholder: "Enter the organization of your intern",
        label: "Organisation",
        required: true
      },
      user_props: ["handleChange"]
    },
    {
      group: true,
      widths: "equal",
      fields: [
        {
          name: "startDate",
          type: "date_field",
          const_props: {
            name: "startDate",
            key: "StartDate",
            placeholder: "YYYY-MM-DD",
            label: "Start date",
            required: true
          },
          user_props: ["handleChange"]
        },
        {
          name: "endDate",
          type: "date_field",
          const_props: {
            name: "endDate",
            key: "EndDate",
            placeholder: "YYYY-MM-DD",
            label: "End Date",
            required: false
          },
          user_props: ["handleChange"]
        }
      ]
    },

    {
      group: false,
      name: "isFullDate",
      type: "boolean_field",
      const_props: {
        name: "isFullDate",
        key: "IsFullDate",
        placeholder: "",
        label: "I remember the exact date",
        required: false
      },
      user_props: ["handleChange"]
    },

    {
      group: false,
      name: "description",
      type: "text_area_field",
      const_props: {
        name: "description",
        key: "Description",
        placeholder: "Describe your experience",
        label: "Description",
        required: false
      },
      user_props: ["handleChange"]
    }
  ],
  url: "experience",
  name: "Internship"
};

export const jobSpecs = Object.assign({}, internSpecs);
jobSpecs.name = "Job";

export const bookSpecs = {
  fields: [
    {
      group: false,
      name: "title",
      type: "input_field",
      const_props: {
        name: "title",
        key: "Title",
        placeholder: "Enter the title of the book",
        label: "Title",
        required: true
      },
      user_props: ["handleChange"]
    },
    {
      group: false,
      name: "authors",
      type: "input_field",
      const_props: {
        name: "authors",
        key: "Author",
        placeholder: "Enter the authors of the book",
        label: "Authors",
        required: true
      },
      user_props: ["handleChange"]
    },
    {
      group: false,
      name: "publisher",
      type: "input_field",
      const_props: {
        name: "publisher",
        key: "Publisher",
        placeholder: "Enter the publisher of the book",
        label: "Publisher",
        required: true
      },
      user_props: ["handleChange"]
    },
    {
      group: false,
      name: "year",
      type: "year_field",
      const_props: {
        name: "year",
        key: "year",
        placeholder: "Enter the year of writing the book",
        label: "Year",
        required: true
      },
      user_props: ["handleChange"]
    },
    {
      group: true,
      widths: "equal",
      fields: [
        {
          name: "pages",
          type: "input_field",
          const_props: {
            name: "pages",
            key: "Pages",
            placeholder: "Number of pages",
            label: "Pages",
            required: false
          },
          user_props: ["handleChange"]
        },
        {
          name: "volumes",
          type: "input_field",
          const_props: {
            name: "volumes",
            key: "Volumes",
            placeholder: "Number of volumes",
            label: "Volumes",
            required: false
          },
          user_props: ["handleChange"]
        }
      ]
    }
  ],

  url: "book",
  name: "Book"
};
export const previousEducationSpecs = {
  fields: [
    {
      group: true,
      widths: "equal",
      fields: [
        {
          name: "institute",
          type: "input_field",
          const_props: {
            name: "institute",
            key: "Institute",
            placeholder: "",
            label: "Institute",
            required: true
          },
          user_props: ["handleChange"]
        },
        {
          name: "degree",
          type: "input_field",
          const_props: {
            name: "degree",
            key: "Degree",
            placeholder: "",
            label: "Degree",
            required: true
          },
          user_props: ["handleChange"]
        }
      ]
    },
    {
      group: false,
      name: "graduation",
      type: "choice_field",
      const_props: {
        name: "graduation",
        key: "Graduation",
        placeholder: "",
        label: "Graduation",
        required: true,
        options: graduationOptions
      },
      user_props: ["handleChange"]
    },
    {
      group: false,
      name: "field",
      type: "input_field",
      const_props: {
        name: "field",
        key: "Field",
        placeholder: "Enter the field you studied in Ex: Science, Commerce",
        label: "Field",
        required: false
      },
      user_props: ["handleChange"]
    },
    {
      group: false,
      name: "cgpa",
      type: "input_field",
      const_props: {
        name: "cgpa",
        key: "Cgpa",
        placeholder: "",
        label: "CGPA",
        required: false
      },
      user_props: ["handleChange"]
    },
    {
      group: false,
      name: "year",
      type: "year_field",
      const_props: {
        name: "year",
        key: "Year",
        placeholder: "",
        label: "Year",
        required: false
      },
      user_props: ["handleChange"]
    }
  ],
  url: "previous_education",
  name: "Previous education"
};
