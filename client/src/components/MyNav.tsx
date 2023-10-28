import { useContext } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../context/AuthContext";

function MyNav() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <div>
            <LinkContainer to={"/"}>
              <Navbar.Brand href="#home">TotArt</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>
          <div>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer to={"content"}>
                  <Nav.Link href="#home">Content</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"contact"}>
                  <Nav.Link href="#link">Contact</Nav.Link>
                </LinkContainer>
                {user ? (
                  <>
                    <LinkContainer to={"dashboard"}>
                      <Nav.Link href="#link">
                        <img
                          src="https://res.cloudinary.com/dqdofxwft/image/upload/v1698504183/other/iepj2zazldghmuvjmchh.svg"
                          alt="notebook-image"
                          width={"20px"}
                        />{" "}
                        Dashboard
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={"account"}>
                      <Button variant="danger" onClick={logout}>
                        <img
                          src="https://res.cloudinary.com/dqdofxwft/image/upload/v1698503714/other/geftubitqi6em6twzzp7.svg"
                          alt="logout-icon"
                          width={"20px"}
                        />
                      </Button>
                    </LinkContainer>
                  </>
                ) : (
                  <LinkContainer to={"account"}>
                    <Nav.Link href="#link">
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
