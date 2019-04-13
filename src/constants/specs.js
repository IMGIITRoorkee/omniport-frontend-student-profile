import { graduationOptions } from "./graduationOptions";
import { experienceOptions } from "./experienceOptions";

export const specs = {
  interest: {
    icon: "game",
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
          placeholder: "Topic",
          label: "Topic",
          required: true
        },
        user_props: ["handleChange"]
      }
    ],
    url: "interest",
    name: "Interest"
  },
  achievement: {
    icon: "winner",
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
          placeholder: "Achievement",
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
    icon: "student",
    draggable: false,
    sortBy: "semester",
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
              placeholder: "semester",
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
              placeholder: "CGPA",
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
              placeholder: "SGPA",
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
    icon: "student",
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
              placeholder: "Institute",
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
              placeholder: "Degree",
              label: "Degree",
              required: true
            },
            user_props: ["handleChange"]
          }
        ]
      },
      {
        group: false,
        name: "year",
        type: "year_field",
        const_props: {
          name: "year",
          key: "Year",
          placeholder: "Year",
          label: "Year",
          required: false
        },
        user_props: ["handleChange"]
      },
      {
        group: false,
        name: "graduation",
        type: "choice_field",
        const_props: {
          name: "graduation",
          key: "Graduation",
          placeholder: "Graduation",
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
          placeholder: "CGPA",
          label: "CGPA",
          required: false
        },
        user_props: ["handleChange"]
      },
      {
        group: false,
        name: "percentage",
        type: "input_field",
        const_props: {
          name: "percentage",
          key: "Percentage",
          placeholder: "Percentage",
          label: "Percentage",
          required: true
        },
        user_props: ["handleChange"]
      },
      {
        group: false,
        name: "isPercentage",
        type: "boolean_field",
        const_props: {
          name: "isPercentage",
          key: "IsPercentage",
          placeholder: "",
          label: "Consider priority of percentage greater than CGPA",
          required: false
        },
        user_props: ["handleChange"]
      }
    ],
    url: "previous_education",
    name: "Previous education"
  },

  position: {
    icon: "bookmark",
    draggable: false,
    sortBy: "priority",
    ascending: true,
    plural: "Positions",
    fields: [
      {
        group: false,
        name: "position",
        type: "input_field",
        const_props: {
          name: "position",
          key: "Position",
          placeholder: "Position",
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
          placeholder: "Organisation",
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
          placeholder: "Description",
          label: "Description",
          required: false
        },
        user_props: ["handleChange"]
      }
    ],
    url: "position",
    name: "Position"
  },
  experience: {
    icon: "suitcase",
    draggable: false,
    sortBy: "priority",
    ascending: true,
    plural: "Experiences",
    fields: [
      {
        group: false,
        name: "position",
        type: "input_field",
        const_props: {
          name: "position",
          key: "Position",
          placeholder: "Position",
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
          placeholder: "Organisation",
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
        name: "experienceType",
        type: "choice_field",
        const_props: {
          name: "experienceType",
          key: "ExperienceType",
          placeholder: "Job/Internship",
          label: "ExperienceType",
          required: true,
          options: experienceOptions
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
          placeholder: "Description",
          label: "Description",
          required: false
        },
        user_props: ["handleChange"]
      }
    ],
    url: "experience",
    name: "Experience"
  },
  project: {
    icon: "folder",
    draggable: false,
    sortBy: "priority",
    ascending: true,
    plural: "Projects",
    fields: [
      {
        group: false,
        name: "topic",
        type: "input_field",
        const_props: {
          name: "topic",
          key: "Topic",
          placeholder: "Topic",
          label: "Topic",
          required: true
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
          placeholder: "Field of project",
          label: "Field",
          required: false
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
          placeholder: "Description",
          label: "Description",
          required: false
        },
        user_props: ["handleChange"]
      },
      {
        group: false,
        name: "image",
        type: "file_field",
        const_props: {
          name: "image",
          key: "Image",
          placeholder: "",
          label: "Image",
          required: false
        },
        user_props: ["handleFile", "handleDelete"]
      }
    ],
    url: "project",
    name: "Project"
  },
  book: {
    icon: "book",
    draggable: true,
    sortBy: "priority",
    ascending: true,
    plural: "Books",
    fields: [
      {
        group: false,
        name: "title",
        type: "input_field",
        const_props: {
          name: "title",
          key: "Title",
          placeholder: "Title",
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
          placeholder: "Authors",
          label: "Authors",
          required: true
        },
        user_props: ["handleChange"]
      },
      {
        group: false,
        name: "contribution",
        type: "input_field",
        const_props: {
          name: "contribution",
          key: "contribution",
          placeholder: "Your contribution",
          label: "Contribution",
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
          placeholder: "Publisher",
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
          placeholder: "Year",
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
              placeholder: "Pages",
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
              placeholder: "Volumes",
              label: "Volumes",
              required: false
            },
            user_props: ["handleChange"]
          }
        ]
      },
      {
        group: false,
        name: "isbnCode",
        type: "input_field",
        const_props: {
          name: "isbnCode",
          key: "isbnCode",
          placeholder: "ISBN Code",
          label: "IsbnCode",
          required: true
        },
        user_props: ["handleChange"]
      },
      {
        group: false,
        name: "editors",
        type: "input_field",
        const_props: {
          name: "editors",
          key: "editors",
          placeholder: "",
          label: "Editors",
          required: true
        },
        user_props: ["handleChange"]
      }
    ],

    url: "book",
    name: "Book"
  },
  paper: {
    icon: "paperclip",
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
          placeholder: "Name of the journal",
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
          placeholder: "Authors",
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
          placeholder: "Publisher",
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
          placeholder: "Year",
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
  },
  referee: {
    icon: "at",
    draggable: true,
    sortBy: "priority",
    ascending: false,
    plural: "References",
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
              placeholder: "Name of the referee",
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
              placeholder: "Designation",
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
          placeholder: "Institute",
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
          placeholder: "Phone number",
          label: "Phone",
          required: false
        },
        user_props: ["handleChange"]
      },
      {
        group: false,
        name: "email",
        type: "input_field",
        const_props: {
          name: "email",
          key: "email",
          placeholder: "Email",
          label: "Email",
          required: true
        },
        user_props: ["handleChange"]
      }
    ],

    url: "referee",
    name: "Reference"
  }
};
