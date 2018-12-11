import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Segment, Button } from "semantic-ui-react";
import axios from "axios";
import { getCookie } from "formula_one";
import style from "../stylesheets/bookForm.css";
const grid = 8;

export class DragAndDropBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.data,
      element: props.element,
      modelName: props.modelName
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    ...draggableStyle
  });

  getListStyle = isDraggingOver => ({
    color: "black",
    padding: grid
  });
  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  onSubmit = () => {
    var arr = [];
    arr = this.state.items.map(data => data.id);
    console.log(arr);
    let headers = {
      "X-CSRFToken": getCookie("csrftoken")
    };
    const data = {
      model: this.state.modelName,
      order: arr
    };
    axios({
      method: "post",
      url: "/api/student_profile/rearrange/",
      data: data,
      headers: headers
    }).then(response => {
      this.props.handleUpdate(response.data);
    });
  };
  render() {
    const { element } = this.state;
    return (
      <Segment attached compact>
        <Segment attached>REORDER</Segment>
        <Segment attached styleName="style.dragStyle">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={this.getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items.map((item, index) => (
                    <Draggable key={index} draggableId={index} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {React.createElement(
                            element,
                            {
                              data: item,
                              id: item.id,
                              key: item.id,
                              rearrange: true
                            },
                            null
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Segment>
        <Button onClick={this.onSubmit}>Change order</Button>
        <Button onClick={this.props.handleDragHide}>Cancel</Button>
      </Segment>
    );
  }
}
