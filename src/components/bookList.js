import React from "react";
import { Book } from "./book";
import { Dimmer, Icon, Segment, Popup, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "../styles.css";
import inline from "formula_one/src/css/inline.css";
import { initial } from "./bookForm";
import { DragAndDropBox } from "./dragAndDropBox";
import { ComponentTransition } from "./transition";
import genericFormMaker from "./genericFormMaker";
const bookSpec = {
  fields:[ {
  
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
    }
  ],  
  group_fields: [{
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
  }],

  initial: {
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
    visibility: true
  },
  url: "book",
  name:"Book"
};
console.log(Book);
const BookForm = genericFormMaker(bookSpec);
export class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      active: false,
      formData: initial.data,
      data: [],
      empty: ""
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = e => {
    let url = "";
    let { handle } = this.props;
    if (this.props.handle != undefined) url = this.props.handle + "/handle/";
    axios
      .get("/api/student_profile/book/" + url)
      .then(response => {
        if (response.data.length == 0 && handle != undefined) this.setState({ empty: "No books to show" });
        else {
          this.setState({ data: response.data });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  manageData = id => {
    this.setState({
      formData: this.state.data.find(x => x.id == id),
      update: true,
      active: true
    });
  };
  appendData = item => {
    this.setState({ data: [...this.state.data, item] });
  };
  updateDeleteData = (item, option) => {
    const data_array = this.state.data;
    if (option == "delete") {
      const newData = data_array.filter(obj => (obj.id != item.id ? true : false));
      this.setState({ data: newData });
    } else if (option == "put") {
      const newData = data_array.map(obj => (obj.id == item.id ? item : obj));
      this.setState({ data: newData });
    }
  };
  handleShow = e => {
    this.setState({
      active: true,
      formData: initial.data,
      update: false
    });
  };
  handleDragShow = () => {
    this.setState({
      rearrange: true
    });
  };
  handleDragHide = () => {
    this.setState({
      rearrange: false
    });
  };
  handleUpdate = data => {
    this.setState({
      data: data,
      rearrange: false
    });
  };
  handleHide = e => {
    this.setState({ active: false, update: false });
  };

  render() {
    const { active, update, formData, data, rearrange } = this.state;
    console.log(active);
    let { theme } = this.props;
    if (theme == "zero") theme = null;
    console.log(theme);
    const { fetchData, appendData, updateDeleteData, handleHide, handleShow, handleDragShow, handleUpdate } = this;

    let data_array;
    let children;
    if (data != "") {
      children = data.map(data => {
        return <Book data={data} key={data.id} manageData={this.manageData} rearrange={this.props.handle != undefined} />;
      });
    }
    return (
      <ComponentTransition>
        <Segment padded color={theme}>
          <div styleName="style.headingBox">
            <h3 styleName="style.heading">
              <Icon name="book" color={theme || "blue"} /> Books
            </h3>
            {this.props.handle != undefined ? null : (
              <div>
                <Icon color="grey" name="sort" circular onClick={handleDragShow} />
                <Icon color="grey" name="add" circular onClick={handleShow} />
              </div>
            )}
            {this.props.handle != undefined ? <span style={{ color: "grey", textAlign: "right" }}>{this.state.empty}</span> : null}
          </div>

          <Dimmer active={active} page>
            <BookForm
              update={update}
              formData={formData}
              fetchData={fetchData}
              appendData={appendData}
              updateDeleteData={updateDeleteData}
              handleHide={handleHide}
            />
          </Dimmer>
          <Dimmer active={rearrange} page>
            <DragAndDropBox data={data} modelName="Book" element={Book} handleUpdate={handleUpdate} handleDragHide={this.handleDragHide} />
          </Dimmer>
          {data == "" ? null : <Segment.Group> {children}</Segment.Group>}
        </Segment>
      </ComponentTransition>
    );
  }
}
