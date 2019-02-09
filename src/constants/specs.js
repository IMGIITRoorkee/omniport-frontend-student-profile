import { graduationOptions } from "./choiceOptions";

export const specs = {
  interest: {
    draggable: true,
    sortBy: "priority",
    ascending: true,
    plural: "Interests",
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
        user_pstartCaserops: ["handleChange"]
      }
    ],
    url: "interest",
    name: "Interest"
  },
  achievement: {
    draggable: true,
    sortBy: "priority",
    ascending: true,
    plural: "Achievements",
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
  },
  currentEducation: {
    draggable: false,
    sortBy: "semesterNumber",
    ascending: true,
    plural: "Current Education",
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
  },
  previousEducation: {
    draggable: false,
    sortBy: "year",
    ascending: true,
    plural: "Previous Education",
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
  },

  position: {
    draggable: false,
    sortBy: "priority",
    ascending: true,
    plural: "Position",
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
          placeholder: "",
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
    url: "position",
    name: "Position"
  },

  paper: {
    draggable: true,
    sortBy: "priority",
    ascending: false,
    plural: "Papers",
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
  }
};
