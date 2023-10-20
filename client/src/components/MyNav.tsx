import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function MyNav() {
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
                <LinkContainer to={"account"}>
                  <Nav.Link href="#link">Account</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </Container>
  );
}

export default MyNav;
