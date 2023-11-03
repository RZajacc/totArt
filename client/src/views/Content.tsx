import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import { contentData } from "../types/types";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AddContentModal from "../components/AddContentModal";
import "../styles/contentPage.css";

function Content() {
  const { number, posts } = useLoaderData() as contentData;
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? <AddContentModal /> : ""}
      <Container className="content-container">
        <Row xs={4} md={4} className="g-4">
          {posts &&
            posts.map((post, index) => {
              return (
                <>
                  <Col key={index}>
                    <Card className="content-card">
                      <Card.Img
                        variant="top"
                        src={post.imageUrl}
                        className="content-image"
                      />
                      <Card.Body className="text-center">
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Link className={"go-to-details-button"}>
                          <Link
                            to={post._id}
                            className={"go-to-details-button"}
                          >
                            See more
                          </Link>
                        </Card.Link>
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              );
            })}
        </Row>
      </Container>
    </>
  );
}

export default Content;
