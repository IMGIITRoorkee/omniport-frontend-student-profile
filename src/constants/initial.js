// storing the initial form data of all forms
export const initial = {
  interest: {
    update: false,
    data: {
      topic: "",
      id: -1,
      priority: 1,
      visibility: false
    },
    links: []
  },
  achievement: {
    update: false,
    data: {
      achievement: "",
      id: -1,
      priority: 1,
      visibility: false
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
      visibility: false,
      cgpa: "",
      percentage: "",
      isPercentage: false
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
      visibility: false
    },
    links: []
  },
  experience: {
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
      visibility: false,
      experienceType: ""
    },
    links: []
  },
  book: {
    update: false,
    data: {
      id: -1,
      title: "",
      authors: "",
      publisher: "",
      year: "",
      pages: "",
      volumes: "",
      contribution: "",
      editors: "",
      isbnCode: "",
      priority: 1,
      visibility: false,
      book: "",
      bookLink: "",
      links: []
    }
  },
  paper: {
    update: false,
    data: {
      id: -1,
      priority: 1,
      visibility: false,
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
  },
  referee: {
    update: false,
    data: {
      referee: "",
      designation: "",
      institute: "",
      phoneNumber: "",
      email: "",
      priority: 1,
      visibility: false
    },
    links: []
  },
  project: {
    update: false,
    data: {
      id: -1,
      topic: "",
      field: "",
      description: "",
      startDate: "",
      endDate: "",
      isFullDate: true,
      image: "",
      imageLink: "",
      priority: 1,
      visibility: false
    },
    links: ["image"]
  }
};
