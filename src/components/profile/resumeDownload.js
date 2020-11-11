import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Card, Icon, Popup, Segment, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import style from "../../styles.css";

export function ResumeDownload(props) {
  const { url, theme } = props;

  const preview_url = "/student_profile/" + props.ownHandle + "/";
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
                <Label size="large" color={theme}>
                  <Icon name="download" />
                  Resume
                </Label>
              </a>
            ) : (
              <Popup
                trigger={
                  <Label size="large" color={theme}>
                    <Icon name="download" />
                    Resume
                  </Label>
                }
                content="Resume not uploaded"
              />
            )}
            <Link to={preview_url} target="_blank">
              <Label size="large" color={theme}>
                <Icon name="eye" />
                Preview
              </Label>
            </Link>
          </Segment>
        </BrowserView>
        <MobileView>
          <Segment
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            {url != null ? (
              <a href={url} target="_blank">
                <Button icon color={theme}>
                  <Icon name="download" />
                  Resume
                </Button>
              </a>
            ) : (
              <Popup
                trigger={
                  <Button icon color={theme}>
                    <Icon name="download" />
                    Resume
                  </Button>
                }
                content="Resume not uploaded"
              />
            )}
            <Link to={preview_url} target="_blank">
              <Button icon color={theme}>
                <Icon name="print" />
                Preview
              </Button>
            </Link>
          </Segment>
        </MobileView>
      </div>
    );
  } else {
    return url != null ? (
      <Segment styleName='style.headingBox'>
        <h4 styleName='style.heading'>Download resume</h4>
        <a href={url} target='_blank'>
          <Icon name='download' color={theme} />
        </a>
      </Segment>
    ) : null
  }
}
