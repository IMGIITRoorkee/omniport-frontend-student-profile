import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Card, Icon, Popup, Segment, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import style from "../styles.css";

export function ResumeDownload(props) {
  console.log(props.url != null);
  const url = props.url;
  const preview_url = "/student_profile/" + props.ownHandle + "/";
  console.log(preview_url);
  if (props.preview == false) {
    return (
      <div>
        <BrowserView>
          <Segment
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            {url != null ? (
              <a href={url} target="_blank">
                <Label size="large" color="blue">
                  <Icon name="download" />
                  Resume
                </Label>
              </a>
            ) : (
              <Popup
                trigger={
                  <Label size="large" color="blue">
                    <Icon name="download" />
                    Resume
                  </Label>
                }
                content="Resume not uploaded"
              />
            )}
            <Link to={preview_url} target="_blank">
              <Label size="large" color="blue" as="a">
                <Icon name="print" />
                Preview
              </Label>
            </Link>
          </Segment>
        </BrowserView>
        <MobileView>
          <Segment
            color="teal"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            {url != null ? (
              <a href={url}>
                <Button icon color="blue">
                  <Icon name="download" />
                  Resume
                </Button>
              </a>
            ) : (
              <Popup
                trigger={
                  <Button icon color="blue">
                    <Icon name="download" />
                    Resume
                  </Button>
                }
                content="Resume not uploaded"
              />
            )}
            <Button icon color="blue">
              <Icon name="print" />
              Preview
            </Button>
          </Segment>
        </MobileView>
      </div>
    );
  } else {
    return (
      <Segment styleName="style.headingBox">
        <h4 styleName="style.heading">Download resume</h4>
        {url != null ? (
          <a href={url}>
            <Icon name="download" color="blue" />
          </a>
        ) : (
          <Popup
            trigger={<Icon name="download" color="blue" />}
            content="Resume not uploaded"
          />
        )}
      </Segment>
    );
  }
}
