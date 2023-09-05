import Props from "prop-types";
import Appbar from "./Appbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ThreeDots from "./loaders/ThreeDots";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import CompleteProfilePrompt from "./prompts/CompleteProfilePrompt";
import LiveChat from "./LiveChat";

const Layout = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  return (
    <>
      <LiveChat />
      <Appbar />

      <CompleteProfilePrompt
        profileCompleted={false}
        authenticated={isAuthenticated}
        isVerified={user?.email_verified ?? false}
      />
      <Container className="mt-3">
        <div className="content-spacer">{children}</div>
      </Container>
      <Footer />
    </>
  );
};

Layout.Props = {
  children: Props.node.isRequired,
};

export default Layout;
