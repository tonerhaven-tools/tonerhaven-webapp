import Props from "prop-types";
import Appbar from "./Appbar";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import LiveChat from "./LiveChat";
import AccountChecks from "./AccountChecks";

const Layout = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  return (
    <>
      <LiveChat />
      <Appbar />
      <AccountChecks />
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
