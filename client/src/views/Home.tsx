import { Col, Container, Row } from "react-bootstrap";
import "../styles/global.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Container className="contact-container">
        <Row className="justify-content-md-center text-center">
          <Col xs={7} className="contact-info">
            <h1>Welcome to Totart page!</h1>
            <p>
              Have you seen something interesting around the city and want to
              share it with others?
            </p>
            <p>
              If so you've came to the right place. You can watch other people
              content
            </p>
            <p>
              Or you can create your own. To enjoy all of the benefits provided
              create your <Link to={"account"}>account!</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
