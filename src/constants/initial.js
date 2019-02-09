// storing the initial form data of all forms
export const initial = {
  interest: {
    update: false,
    data: { topic: "", id: -1, visibility: true },
    links: []
  },
  achievement: {
    update: false,
    data: { achievement: "", id: -1, visibility: true },
    links: []
  },
  currentEducation: {
    update: false,
    data: {
      semester: "",
      cgpa: "",
      sgpa: "",
      priority: 1,
      visibility: true
    },
    links: []
  },
  previousEducation: {
    update: false,
    data: {
      year: "",
      institute: "",
      field: "",
      degree: "",
      graduation: "",
      priority: 1,
      visibility: true,
      cgpa: "",
      percentage: "",
      is_percentage: false
    },
    links: []
  },
  position: {
    update: false,
    data: {
      id: -1,
      startDate: "",
      endDate: "",
      isFullDate: true,
      position: "",
      organisation: "",
      description: "",
      priority: 1,
      visibility: true
    },
    links: []
  },
  paper: {
    update: false,
    data: {
      id: -1,
      priority: 1,
      visibility: true,
      journal: "",
      title: "",
      authors: "",
      publisher: "",
      year: "",
      pages: "",
      volumes: "",
      paper: "",
      paperLink: ""
    },
    links: ["paper"]
  }
};
