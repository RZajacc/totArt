import { useEffect, useState, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Login from "../components/Login";
import Register from "../components/Register";

import "../styles/accountPage.css";
import GetProfile from "../components/GetProfile";
import Heading from "../components/Heading";
import Section from "../components/Section";
import { AuthContext } from "../context/AuthContext";

function Account() {
  const [userLogged, setUserLogged] = useState(false);
  const [LogReg, setLogReg] = useState("register");
  const val = useContext(AuthContext);
  console.log("Context val-->", val);

  // * -----------LOGGING IN--------------------
  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  };

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setUserLogged(false);
  // };

  console.log(LogReg);
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
          <Col xs={4}>
            <img
              src="../src/assets/berlin_wall_theme.jpg"
              alt="Berlin wall photo"
              className="berlin_wall_theme"
            />
          </Col>

          <Col xs={8}>
            {/* <Button onClick={logout}>Logout</Button> */}
            {LogReg === "register" ? (
              <Register setLogReg={setLogReg} />
            ) : (
              <Login setLogReg={setLogReg} />
            )}
            <GetProfile />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Account;
