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
          <Link to={"/"} className={"navbar-brand"}>
            <Logo />
          </Link>
        </Navbar.Brand>

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
          <li className="nav-item">
            <Link
              id="num_cart_items"
              className="nav-link"
              tabIndex="-1"
              to={"/cart"}
            >
              {" "}
              🛒 Cart (<span>0</span>)
            </Link>
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
