import React from "react";
import axios from "axios";
import { LinkForm } from "./linkForm";
import { Segment, Dimmer, Icon } from "semantic-ui-react";
import style from "../../styles.css";

let options = [];

function myFunction(value, index, array, item) {
  let dict = {};
  dict.key = item.value;
  dict.text = item.displayName;
  dict.value = item.value;
  options[index] = { item };
}
export class LinkDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      active: false,
      linkOptions: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }
  updateData = data => {
    this.setState({ data: data });
  };
  fetchData = () => {
    let url = "";
    if (this.props.handle != undefined) url = this.props.handle + "/handle/";
    axios
      .get("/api/student_profile/social_link/" + url)
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
    if (this.props.handle == undefined) {
      axios
        .options("/api/student_profile/social_link/" + url)
        .then(response => {
          let dict_array = [];
          let options = response.data.actions.POST.site.choices;
          for (let i = 0; i < options.length; i++) {
            let dict = {};
            let item = options[i];
            dict.key = item.value;
            dict.text = item.displayName;
            dict.value = item.value;
            dict_array[i] = dict;
          }
          this.setState({ linkOptions: dict_array });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleShow = e => {
    this.setState({
      active: true
    });
  };
  handleUpdate = data => {
    this.setState({
      data: data,
      active: false
    });
  };
  render() {
    const data = this.state.data;
    const { theme } = this.props;
    const children = Array.from(data).map(function(child, index) {
      return (
        <a href={child.url} target="_blank" key={index} title={child.siteLogo}>
          <Icon size="large" key={index} name={child.siteLogo} color={theme} />
        </a>
      );
    });
    return (
      <div>
        {this.props.handle === undefined ? (
          <div styleName="style.socialHeadingBox">
            <h4 styleName="style.heading">Social links</h4>
            <Icon color="grey" name="add" circular circular onClick={this.handleShow} />
          </div>
        ) : null}

        <Segment basic textAlign="center" style={{ margin: "0", padding: "0" }}>
          {children}
        </Segment>
        <Dimmer active={this.state.active} page>
          <LinkForm
            data={data}
            handleUpdate={this.handleUpdate}
            options={this.state.linkOptions}
            theme={this.props.theme}
          />
        </Dimmer>
      </div>
    );
  }
}
