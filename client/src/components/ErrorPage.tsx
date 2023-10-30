import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useRouteError } from "react-router-dom";

type ErrorResponse = {
  data: string;
  status: number;
  statusText: string;
};

function ErrorPage() {
  const error = useRouteError() as ErrorResponse;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container className="error-container">
      <Row className="justify-content-center text-center">
        <Col xs={5}>
          <img
            src="https://res.cloudinary.com/dqdofxwft/image/upload/v1698673454/other/qgzz09ndlrdftje1eb9l.png"
            width={"85%"}
          />
          <h4>Sorry, an unexpected error has occured!</h4>
          <p>
            <i>
              {error.status} {error.statusText}
            </i>
          </p>
          <Button onClick={handleBack} variant="danger">
            Take me back!
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ErrorPage;
