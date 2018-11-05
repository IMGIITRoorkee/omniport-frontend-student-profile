import React from "react";
import { Form, Input, Button } from "semantic-ui-react";

class InterestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: "",
      id: -1,
      update: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ topics: event.target.value });
  }
  handleSubmit(event) {
    this.props.postData({
      topics: this.state.topics
    });
    this.setState({ topics: "" });
    this.props.handleHide();
    event.preventDefault();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props != nextProps && nextProps.update == true) {
      console.log(nextProps);
      this.setState({
        id: nextProps.formData.id,
        topics: nextProps.formData.topics,
        update: nextProps.update
      });
    } else if (this.props != nextProps && nextProps.update == false) {
      this.setState({
        topics: "",
        id: -1,
        update: false
      });
    }
  }
  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label style={{ color: "white" }}>Topics</label>
            <Input onChange={this.handleChange} value={this.state.topics} />
          </Form.Field>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Form>
      </div>
    );
  }
}
export default InterestForm;
