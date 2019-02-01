const appMenu = (
  <div style={{ zIndex: "5", position: "sticky", top: 0, backgroundColor: "white" }}>
    <Menu pointing secondary size="small" fluid icon="labeled" borderless stackable widths={8}>
      <Menu.Item
        color={theme || "blue"}
        name="Interests"
        active={activeItem === "Interests"}
        onClick={(e, target) => {
          this.handleItemClick;
          this.setState({ activeItem: "Interests" });
          this.scroll("interest");
        }}
      />
      <Menu.Item
        color={theme || "blue"}
        fitted="horizontally"
        name="Achievements"
        active={activeItem === "Achievements"}
        onClick={(e, target) => {
          this.handleItemClick;
          this.setState({ activeItem: "Achievements" });
          this.scroll("achievement");
        }}
      />
      <Menu.Item
        color={theme || "blue"}
        name="Experience"
        active={activeItem === "Internships"}
        onClick={(e, target) => {
          this.handleItemClick;
          this.setState({ activeItem: "Internships" });
          this.scroll("internship");
        }}
      />
      <Menu.Item
        color={theme || "blue"}
        name="Projects"
        active={activeItem === "Projects"}
        onClick={(e, target) => {
          this.handleItemClick;
          this.setState({ activeItem: "Projects" });
          this.scroll("project");
        }}
      />
      <Menu.Item
        color={theme || "blue"}
        name="Skills"
        active={activeItem === "Skills"}
        onClick={(e, target) => {
          this.handleItemClick;
          this.setState({ activeItem: "Skills" });
          this.scroll("skill");
        }}
      />
      <Menu.Item
        color={theme || "blue"}
        name="Publications"
        active={activeItem === "Publications"}
        onClick={(e, target) => {
          this.handleItemClick;
          this.setState({ activeItem: "Publications" });
          this.scroll("book");
        }}
      />
      <Menu.Item
        color={theme}
        name="Education"
        active={activeItem === "Education"}
        onClick={(e, target) => {
          this.handleItemClick;
          this.setState({ activeItem: "Education" });
          this.scroll("currentEducation");
        }}
      />
      <Menu.Item
        color={theme}
        name="References"
        active={activeItem === "References"}
        onClick={(e, target) => {
          this.handleItemClick;
          this.setState({ activeItem: "References" });
          this.scroll("referee");
        }}
      />
    </Menu>
  </div>
);
