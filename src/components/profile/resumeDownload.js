import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Card, Icon, Popup, Segment, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import PublishButton from "./publishButton";

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
                <Button icon basic color={theme}>
                  <Icon name="download" />
                  Resume
                </Button>
              </a>
            ) : (
              <Popup
                trigger={
                  <Button icon basic color={theme}>
                    <Icon name="download" />
                    Resume
                  </Button>
                }
                content="Resume not uploaded"
              />
            )}
            <Link to={preview_url} target="_blank">
              <Button icon basic color={theme}>
                <Icon name="eye" />
                Preview
              </Button>
            </Link>
            <PublishButton handle={props.ownHandle} isMobile={false} />
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
            <PublishButton handle={props.ownHandle} isMobile={true} />
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
