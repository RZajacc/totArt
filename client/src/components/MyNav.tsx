import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

function MyNav() {
  return (
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <div>
            <Navbar.Brand href="#home">TotArt</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>
          <div>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Content</Nav.Link>
                <Nav.Link href="#link">Contact</Nav.Link>
                <Nav.Link href="#link">Account</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </Container>
  );
}

export default MyNav;
