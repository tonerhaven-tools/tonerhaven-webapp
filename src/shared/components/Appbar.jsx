import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import "../../styles/toner-haven.scss"
import {useState} from "react";
import Logo from "./Logo";

const Appbar = () => {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const handleLogin = () => {
    if (!isAuthenticated) loginWithRedirect();
    else logout({ logoutParams: { returnTo: window.location.origin } });
  };
  const [userDropdown,setUserDropdown] = useState(false)
  const ToggleDropdown = () => {
    if (userDropdown) {
      setUserDropdown(false)
    } else {
      setUserDropdown(true)
    }
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
      <Container>
        <Navbar.Brand>
          <a className={"navbar-brand"} href={"/"}>
            <Logo/>
          </a>
        </Navbar.Brand>

        {/* Navbar Left */}
        <ul className="navbar-nav">
          <li className="nav-item">
              <a className="nav-link" href="/products" tabIndex="-1">Products</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/contact-us" tabIndex="-1">Contact Us</a>
          </li>
        </ul>

        {/* Navbar Right */}
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a href="/cart" className="nav-link" id="num_cart_items"> 🛒 Cart (<span>0</span>)
            </a>
          </li>
          <li className="nav-item dropdown">
            <a onClick={ToggleDropdown} className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {isAuthenticated && (
                <span>
                  Howdy, {user.nickname ?? ""}!
                </span>
              )}
            </a>
            <div className={userDropdown?'dropdown-menu show':'dropdown-menu'} aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">My Profile</a>
              <a className="dropdown-item" href="#">Orders</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#" onClick={handleLogin}>Logout</a>
            </div>
          </li>
        </ul>

        <Navbar.Toggle />
      </Container>
    </Navbar>
  );
};

export default Appbar;
