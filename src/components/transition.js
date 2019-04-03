import React from "react";
import { Transition, Message, Segment } from "semantic-ui-react";

export const ErrorTransition = props => {
  return (
    <Transition visible={props.errors.length > 0} animation="bounce" duration={500}>
      <Message hidden={props.errors.length == 0} error header="There were some errors with your submission:" list={props.errors} />
    </Transition>
  );
};

export const FormTransition = props => {
  return (
    <Transition visible={props.visible} animation="fade" duration={500} unmountOnHide>
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
      <div style={{ marginTop: "14px", marginBottom: "14px" }}>
        <Transition visible={this.state.tvisibility} animation="fade" duration={5000}>
          {this.props.children}
        </Transition>
      </div>
    );
  }
}

export class Confirmation extends React.Component {
  constructor(props) {
    state = { open: false };
  }
  show = () => this.setState({ open: true });
  handleConfirm = () => this.setState({ open: false });
  handleCancel = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <Button onClick={this.show}>Show</Button>
        <Confirm open={this.state.open} header="This is a custom header" onCancel={this.handleCancel} onConfirm={this.handleConfirm} />
      </div>
    );
  }
}
