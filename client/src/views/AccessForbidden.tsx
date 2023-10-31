import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AccessForbidden() {
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    navigate("/account");
  };
  return (
    <>
      <Container className="access-forbidden-container">
        <Row className="justify-content-center text-center">
          <Col xs={5} className="access-forbidden-messages">
            <h3>Sorry, but you need to log in to access this page!</h3>
            <p>
              To to that simply go to Account link or click the button below
            </p>
            <Button variant="success" onClick={handleLoginRedirect}>
              Take me to login
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AccessForbidden;
