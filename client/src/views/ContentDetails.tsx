import { Container, Row, Col } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import "../styles/contentPage.css";
import { post } from "../types/types";

function ContentDetails() {
  const data = useLoaderData() as post;

  console.log(data);
  return (
    <>
      <Container className="details-container">
        <Row className="justify-content-center text-center">
          <Col xs={8} className="details-column">
            <h1>
              Title: <span className="image-title">{data.title}</span>
            </h1>
            <p>
              <em>Added by: {data.author}</em>
            </p>
            <img src={data.imageUrl} className="details-image" />
            <div className="image-info">
              <h2>Description</h2>
              <p className="details-text">{data.description}</p>
              <h2>Where to find it</h2>
              <p className="details-text">{data.location}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ContentDetails;
