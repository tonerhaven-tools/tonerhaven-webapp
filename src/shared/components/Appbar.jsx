import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import "../../styles/toner-haven.scss";
import { useState } from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { Placeholder } from "react-bootstrap";
import LoginButton from "./LoginButton";

const Appbar = () => {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [userDropdown, setUserDropdown] = useState(false);

  const handleLogin = () => {
    if (!isAuthenticated) loginWithRedirect();
    else logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const ToggleDropdown = () => {
    if (userDropdown) {
      setUserDropdown(false);
    } else {
      setUserDropdown(true);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
      <Container>
        <Navbar.Brand>
          <a className={"navbar-brand"} href={"/"}>
            <Logo />
          </a>
        </Navbar.Brand>

        {/* Navbar Left */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/products" tabIndex="-1">
              Products
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact-us" tabIndex="-1">
              Contact Us
            </a>
          </li>
        </ul>

        {/* Navbar Right */}
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a href="/cart" className="nav-link" id="num_cart_items">
              {" "}
              🛒 Cart (<span>0</span>)
            </a>
          </li>
          {isAuthenticated ? (
            <li className="nav-item dropdown">
              <a
                onClick={ToggleDropdown}
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {isAuthenticated ? (
                  <span>Howdy, {user.nickname ?? ""}!</span>
                ) : (
                  <Placeholder as={span}>
                    <Placeholder xs={6} />
                  </Placeholder>
                )}
              </a>
              <div
                className={
                  userDropdown ? "dropdown-menu show" : "dropdown-menu"
                }
                aria-labelledby="navbarDropdown"
              >
                <Link className="dropdown-item" to={"/app/profile"}>
                  My Profile
                </Link>
                <a className="dropdown-item" href="#"></a>

                <Link className="dropdown-item" to={"/app/orders"}>
                  Orders
                </Link>

                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#" onClick={handleLogin}>
                  Logout
                </a>
              </div>
            </li>
          ) : (
            <LoginButton />
          )}
        </ul>

        <Navbar.Toggle />
      </Container>
    </Navbar>
  );
};

export default Appbar;
