import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Login from "../components/Login";
import Register from "../components/Register";

import "../styles/accountPage.css";

function Account() {
  const [userLogged, setUserLogged] = useState(false);

  // * -----------LOGGING IN--------------------
  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  };

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setUserLogged(false);
  // };

  useEffect(() => {
    const isLoggedIn = isUserLoggedIn();
    if (isLoggedIn) {
      setUserLogged(true);
      console.log("User is logged in!");
    } else {
      console.log("User is NOT logged in");
      setUserLogged(false);
    }
  }, [userLogged]);

  return (
    <>
      <Container className="userAuthContainer">
        <Row className="justify-content-center">
          <Col xs={3}>
            <img
              src="../src/assets/berlin_wall_theme.jpg"
              alt="Berlin wall photo"
              className="berlin_wall_theme"
            />
          </Col>

          <Col xs={6}>
            {/* <Button onClick={logout}>Logout</Button> */}

            <Login />
            <Register />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Account;
