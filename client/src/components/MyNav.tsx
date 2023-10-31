import { useContext } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../context/AuthContext";

function MyNav() {
  const { logout, user } = useContext(AuthContext);

  return (
    <Container className="my-nav" fluid>
      <Navbar expand="sm">
        <Container>
          <div>
            <LinkContainer to={"/"}>
              <Navbar.Brand>
                <img
                  src="https://res.cloudinary.com/dqdofxwft/image/upload/v1698666117/other/fo2cwkz4uhiv4zuwmcwp.png"
                  width={"15%"}
                />
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>
          <div>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer to={"content"}>
                  <Nav.Link>Content</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"contact"}>
                  <Nav.Link>Contact</Nav.Link>
                </LinkContainer>
                {user ? (
                  <>
                    <LinkContainer to={"dashboard"}>
                      <Nav.Link>
                        <img
                          src="https://res.cloudinary.com/dqdofxwft/image/upload/v1698504183/other/iepj2zazldghmuvjmchh.svg"
                          alt="notebook-image"
                          width={"20px"}
                        />{" "}
                        {user.userName}
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={"account"}>
                      <Button variant="danger" onClick={logout}>
                        <img
                          src="https://res.cloudinary.com/dqdofxwft/image/upload/v1698503714/other/geftubitqi6em6twzzp7.svg"
                          alt="logout-icon"
                          width={"20px"}
                        />{" "}
                        Logout
                      </Button>
                    </LinkContainer>
                  </>
                ) : (
                  <LinkContainer to={"account"}>
                    <Nav.Link>
                      <img
                        src="https://res.cloudinary.com/dqdofxwft/image/upload/v1698503714/other/dq5ojhbs6beoph6qfqze.svg"
                        alt="user-image"
                        width={"25px"}
                      />
                      Account
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </Container>
  );
}

export default MyNav;
