import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import UserProfile from "../components/UserProfile";
import "../styles/userDashboard.css";
import UserUpdate from "../components/UserUpdate";
import UserFavs from "../components/UserFavs";
import UserPosts from "../components/UserPosts";

function Dashboard() {
  // *-----------HANDLE USER NAV-------------------------------
  const [activeComponent, setActiveComponent] = useState("User profile");

  // ! TYPESCRIPT ON EVENT!
  const userNavHandle = (e) => {
    setActiveComponent(e.target.innerText);
  };

  return (
    <>
      <Container className="dashboard-container">
        <Row className="justify-content-center text-center">
          <Col className="dashboard-nav-column" xs={2}>
            <Row>
              <p className="dashboard-nav-link" onClick={userNavHandle}>
                User profile
              </p>
            </Row>
            <Row>
              <p className="dashboard-nav-link" onClick={userNavHandle}>
                Update profile
              </p>
            </Row>
            <Row>
              <p className="dashboard-nav-link" onClick={userNavHandle}>
                Favourites
              </p>
            </Row>
            <Row>
              <p className="dashboard-nav-link" onClick={userNavHandle}>
                Your posts
              </p>
            </Row>
          </Col>
          <Col className="dashboard-data-column" xs={6}>
            {activeComponent === "User profile" ? (
              <UserProfile />
            ) : activeComponent === "Update profile" ? (
              <UserUpdate />
            ) : activeComponent === "Favourites" ? (
              <UserFavs />
            ) : activeComponent === "Your posts" ? (
              <UserPosts />
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
