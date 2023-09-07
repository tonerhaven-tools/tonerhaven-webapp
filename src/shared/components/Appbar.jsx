import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import Logo from "@/shared/components/Logo";
import { Link } from "react-router-dom";
import { Badge, Nav, NavItem } from "react-bootstrap";
import LoginButton from "@/shared/components/auth/LoginButton";
import CartButton from "./purchase/CartButton";

const Appbar = () => {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogin = () => {
    if (!isAuthenticated) loginWithRedirect();
    else logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <Navbar
      expand="sm"
      id={"navbar"}
      className="bg-body-tertiary justify-content-between"
    >
      <Container>
        <Navbar.Brand>
          <Link to={"/"} className={"navbar-brand"}>
            <Logo />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />

        <Navbar.Collapse>
          {/* Navbar Left */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" tabIndex="-1" to={"/products"}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" tabIndex="-1" to={"/contact-us"}>
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Navbar Right */}
          <ul className="navbar-nav ms-auto">
            <CartButton isAuthenticated={isAuthenticated} />
            <LoginButton />
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Appbar;
