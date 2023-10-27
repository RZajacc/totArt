import { useState, useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Login from "../components/Login";
import Register from "../components/Register";

import "../styles/accountPage.css";
import { AuthContext } from "../context/AuthContext";

function Account() {
  const [LogReg, setLogReg] = useState("register");
  const { setIsLoggedIn, isLoggedIn } = useContext(AuthContext);

  console.log(isLoggedIn);
  // ! AUTH CONTEXT!!!
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <>
      <Container className="userAuthContainer">
        <Row className="justify-content-center">
          <Col xs={4}>
            <img
              src="../src/assets/berlin_wall_theme.jpg"
              alt="Berlin wall photo"
              className="berlin_wall_theme"
            />
          </Col>

          <Col xs={8}>
            <Button onClick={logout}>Logout</Button>
            {LogReg === "register" ? (
              <Register setLogReg={setLogReg} />
            ) : (
              <Login setLogReg={setLogReg} />
            )}
            {/* <GetProfile /> */}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Account;
