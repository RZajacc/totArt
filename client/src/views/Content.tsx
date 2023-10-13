import { useEffect, useState } from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import { postType } from "../types/types";

function Content() {
  const [postData, setPostData] = useState<postType[] | null>(null);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts/all");
      const result = await response.json();
      setPostData(result.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Container>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={postData[0].imageUrl} />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
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
