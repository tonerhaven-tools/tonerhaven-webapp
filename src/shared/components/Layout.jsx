import Props from "prop-types";
import { Container } from "react-bootstrap";
import React, { Suspense } from "react";

const AccountChecks = React.lazy(() => import("../components/AccountChecks"));
const LiveChat = React.lazy(() => import("../components/LiveChat"));
const Appbar = React.lazy(() => import("../components/Appbar"));
const Footer = React.lazy(() => import("../components/Footer"));

const Layout = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <LiveChat />
      <Appbar />
      <AccountChecks />
      <Container className="mt-3">
        <div className="content-spacer">{children}</div>
      </Container>
      <Footer />
    </Suspense>
  );
};

Layout.Props = {
  children: Props.node.isRequired,
};

export default Layout;
