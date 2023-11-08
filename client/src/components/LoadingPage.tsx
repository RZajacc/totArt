import { Col, Container, Row, Spinner } from "react-bootstrap";
import "../styles/global.css";

function LoadingPage() {
  return (
    <>
      <Container className="loadingContainer">
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <h1>Loading... Please wait...</h1>
            <Row className="justify-content-md-center">
              <Col xs lg="5">
                <Spinner
                  animation="border"
                  variant="success"
                  className="spinnerStyle"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoadingPage;
