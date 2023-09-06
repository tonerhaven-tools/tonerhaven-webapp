import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import ContentLoader from "react-content-loader";
import { useState } from "react";
import { Badge, Dropdown, Image } from "react-bootstrap";
import Axios from "axios";

const Loader = (props) => {
  return (
    <ContentLoader
      speed={1}
      width={150}
      height={18}
      viewBox="0 0 150 18"
      backgroundColor="#d9d9d9"
      foregroundColor="#ededed"
      {...props}
    >
      <rect width="150" height="18" />
    </ContentLoader>
  );
};

const Divider = () => (
  <li className="nav-item">
    <span className="nav-link">|</span>
  </li>
);

const LoginButton = () => {
  const { isLoading, loginWithRedirect, logout, isAuthenticated, user } =
    useAuth0();

  const [userDropdown, setUserDropdown] = useState(false);

  const ToggleDropdown = () => {
    if (userDropdown) {
      setUserDropdown(false);
    } else {
      setUserDropdown(true);
    }
  };

  const handleLogin = () => {
    if (!isAuthenticated) loginWithRedirect({ screen_hint: "signup" });
    else logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (isLoading)
    return (
      <li className="nav-item">
        <p className="nav-link">
          <Loader />
        </p>
      </li>
    );

  if (isAuthenticated)
    return (
      <>
        <Divider />
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
            <Image
              className="m-1"
              height={20}
              width={20}
              src={user.picture}
              rounded
            />
            <span>Howdy, {user.nickname ?? ""}!</span>
          </a>
          <div
            className={userDropdown ? "dropdown-menu show" : "dropdown-menu"}
            aria-labelledby="navbarDropdown"
          >
            <Link className="dropdown-item" to={"/app/profile"}>
              My Profile
            </Link>

            <Link className="dropdown-item" to={"/app/orders"}>
              Orders
            </Link>
            <Dropdown.Divider />
            <a className="dropdown-item" href="#" onClick={handleLogin}>
              Logout
            </a>
          </div>
        </li>
      </>
    );

  return (
    <li className="nav-item">
      <a
        style={{ cursor: "pointer" }}
        className="nav-link"
        onClick={handleLogin}
      >
        Login / Register
      </a>
    </li>
  );
};

export default LoginButton;
