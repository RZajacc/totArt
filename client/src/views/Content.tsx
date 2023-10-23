import { Card, Container, ListGroup } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { contentData } from "../types/types";

function Content() {
  const { number, posts } = useLoaderData() as contentData;

  return (
    <>
      <Container>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={posts[0].imageUrl} />
          <Card.Body>
            <Card.Title>Number of posts : {number}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Content;
