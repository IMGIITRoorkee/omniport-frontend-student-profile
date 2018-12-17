import React from "react";
import { Transition, Message } from "semantic-ui-react";

export const ErrorTransition = props => {
  return (
    <Transition
      visible={props.errors.length > 0}
      animation="slide up"
      duration={100}
    >
      <Message
        error
        header="There were some errors with your submission:"
        list={props.errors}
      />
    </Transition>
  );
};

export const FormTransition = props => {
  return (
    <Transition
      visible={props.visible}
      animation="fade"
      duration={500}
      unmountOnHide
    >
      {props.children}
    </Transition>
  );
};

export class ComponentTransition extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tvisibility: false };
  }
  componentDidMount() {
    this.setState({ tvisibility: true });
  }
  render() {
    return (
      <Transition
        visible={this.state.tvisibility}
        animation="fade"
        duration={500}
      >
        {this.props.children}
      </Transition>
    );
  }
}
