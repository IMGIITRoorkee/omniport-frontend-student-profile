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
console.log(BooleanField);

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
    group:false,
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

  url: "achievement",
  name:"Achievement"
};

export const currentEducationSpecs = {
  fields:[
    {
    group:true,
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

export const paperSpecs = {
  fields:[ {
      group:false,
      name: "title",
      type: "input_field",
      const_props: {
        name: "title",
        key:"Title",
        placeholder: "Enter the title of the book",
        label: "Title",
        required: true
      },
      user_props: ["handleChange"]
    },
    {
      group:false,
      name: "journal",
      type: "input_field",
      const_props: {
        name: "journal",
        key:"Journal",
        placeholder: "Enter the name of the journal",
        label: "Journal",
        required: true
      },
      user_props: ["handleChange"]
    },
    {
      group:false,
      name: "authors",
      type: "input_field",
      const_props: {
        name: "authors",
        key:"Author",
        placeholder: "Enter the authors of the book",
        label:"Authors",
        required:true
      },
      user_props: ["handleChange"]
    },
    {
      group:false,
      name: "publisher",
      type: "input_field",
      const_props: {
        name: "publisher",
        key: "Publisher",
        placeholder: "Enter the publisher of the book",
        label: "Publisher",
        required: true
      },
      user_props:["handleChange"]
    },
    {
      group:false,
      name: "year",
      type: "year_field",
      const_props: {
        name: "year",
        key: "year",
        placeholder: "Enter the year of writing the book",
        label: "Year",
        required: true
      },
      user_props:["handleChange"]
    },
    {
      group:true,
      widths:"equal",
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
          user_props:["handleChange"]
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
          user_props:["handleChange"]
        }
      ]
    },
    {
      group:false,
      name: "paper",
      type: "file_field",
      const_props: {
        name: "paper",
        key: "Paper",
        placeholder: "",
        label: "paper",
        required: false
      },
      user_props:["handleFile" ,"handleDelete"]
    }
  ],  
  url: "paper",
  name:"Paper"
};

export const internSpecs = {
  fields:[ {
      group:false,
      name: "position",
      type: "input_field",
      const_props: {
        name: "position",
        key:"Position",
        placeholder: "",
        label: "Position",
        required: true
      },
      user_props: ["handleChange"]
    },
    {
      group:false,
      name: "organisation",
      type: "input_field",
      const_props: {
        name: "organisation",
        key:"Organisation",
        placeholder: "Enter the organization of your intern",
        label: "Organisation",
        required: true
      },
      user_props: ["handleChange"]
    },
    {
      group:true,
      widths:"equal",
      fields: [
        {
          name: "startDate",
          type: "date_field",
          const_props: {
            name: "startDate",
            key: "StartDate",
            placeholder: "",
            label: "Start date",
            required: true
          },
          user_props:["handleChange"]
        },
        {
          name: "endDate",
          type: "date_field",
          const_props: {
            name: "endDate",
            key: "EndDate",
            placeholder: "",
            label: "End Date",
            required: false
          },
          user_props:["handleChange"]
        }
      ]
    },
    
    {
      group:false,
      name: "isFullDate",
      type: "boolean_field",
      const_props: {
        name: "isFullDate",
        key: "IsFullDate",
        placeholder: "",
        label: "I remember the exact date",
        required: false
      },
      user_props:["handleChange"]
    },

    {
      group:false,
      name: "description",
      type: "text_area_field",
      const_props: {
        name: "description",
        key: "Description",
        placeholder: "Describe your experience",
        label: "Description",
        required: false
      },
      user_props:["handleChange"]
    }
   
   ]  ,
  url: "experience",
  name:"Internship"
};

export const jobSpecs = Object.assign({}, internSpecs);
jobSpecs.name = "Job";

export const bookSpecs = {
  fields:[ {
      group:false,
      name: "title",
      type: "input_field",
      const_props: {
        name: "title",
        key:"Title",
        placeholder: "Enter the title of the book",
        label: "Title",
        required: true
      },
      user_props: ["handleChange"]
    },
    {
      group:false,
      name: "authors",
      type: "input_field",
      const_props: {
        name: "authors",
        key:"Author",
        placeholder: "Enter the authors of the book",
        label:"Authors",
        required:true
      },
      user_props: ["handleChange"]
    },
    {
      group:false,
      name: "publisher",
      type: "input_field",
      const_props: {
        name: "publisher",
        key: "Publisher",
        placeholder: "Enter the publisher of the book",
        label: "Publisher",
        required: true
      },
      user_props:["handleChange"]
    },
    {
      group:false,
      name: "year",
      type: "year_field",
      const_props: {
        name: "year",
        key: "year",
        placeholder: "Enter the year of writing the book",
        label: "Year",
        required: true
      },
      user_props:["handleChange"]
    },
    {
      group:true,
      widths:"equal",
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
          user_props:["handleChange"]
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
          user_props:["handleChange"]
        }
      ]
    }
  ],  
 


  url: "book",
  name:"Book"
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

