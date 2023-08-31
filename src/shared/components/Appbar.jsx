import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth0 } from "@auth0/auth0-react";

const Appbar = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const handleLogin = () => {
    if (!isAuthenticated) loginWithRedirect();
    else logout();
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
      <Container fluid>
        <Navbar.Brand>
          <img
            alt=""
            src="/public/printing.png"
            width="30"
            height="30"
            className="m-1 d-inline-block align-top"
          />
          Toner Haven
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleLogin} variant="outline-dark">
            {isAuthenticated ? "Logout" : "Login"}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Appbar;
