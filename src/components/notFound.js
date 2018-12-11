import React from "react";
import { Container, Segment, Header } from "semantic-ui-react";

export function NotFound(props) {
  return (
    <Container>
      <Segment>
        <Header>No user was found with that handle</Header>
      </Segment>
    </Container>
  );
}
