import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Login from "../components/UserLogin";
import Register from "../components/UserRegister";

import "../styles/accountPage.css";

function Account() {
  const [LogReg, setLogReg] = useState("register");

  return (
    <>
      <Container className="userAuthContainer">
        <Row className="justify-content-center">
          <Col xs={8} className="login-register">
            {LogReg === "register" ? (
              <Register setLogReg={setLogReg} />
            ) : (
              <Login setLogReg={setLogReg} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Account;
