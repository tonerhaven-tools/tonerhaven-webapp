import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import ContentLoader from "react-content-loader";

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

const LoginButton = () => {
  const { isLoading, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  if (isLoading)
    return (
      <li className="nav-item">
        <p className="nav-link">
          <Loader />
        </p>
      </li>
    );

  const handleLogin = () => {
    if (!isAuthenticated) loginWithRedirect();
    else logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <li className="nav-item">
      <a className="nav-link" id="num_cart_items" onClick={handleLogin}>
        Login
      </a>
    </li>
  );
};

export default LoginButton;
