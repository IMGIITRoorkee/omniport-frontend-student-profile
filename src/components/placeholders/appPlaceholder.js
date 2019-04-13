import React from "react";
import { Placeholder, Grid, Card, Container, Segment, Button } from "semantic-ui-react";

export const AppPlaceholder = () => {
  return (
    <Placeholder fluid>
      <Container as={Segment} basic>
        <Placeholder.Header />
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={4}>
              <Card>
                <Placeholder>
                  <Placeholder.Image square />
                </Placeholder>
                <Card.Content>
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line length="very short" />
                      <Placeholder.Line length="medium" />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line length="short" />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={12}>
              <Placeholder as={Segment} />
              <Placeholder as={Segment} />
              <Placeholder as={Segment} />
              <Placeholder as={Segment} />
              <Placeholder as={Segment} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

      <Placeholder.Paragraph>
        <Placeholder.Line length="full" />
        <Placeholder.Line length="very long" />
      </Placeholder.Paragraph>
    </Placeholder>
  );
};
