import Props from "prop-types";
import { Container } from "react-bootstrap";
import React, { ReactNode, Suspense } from "react";
import LayoutHeader from "./LayoutHeader";
import { WindmillSpinner } from "react-spinner-overlay";

const AccountChecks = React.lazy(() => import("./AccountChecks"));
const LiveChat = React.lazy(() => import("./LiveChat"));
const Appbar = React.lazy(() => import("./Appbar"));
const Footer = React.lazy(() => import("./Footer"));

interface LayoutProps {
  children: ReactNode;
  header?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, header = undefined }) => {
  return (
    <Suspense  >
      <LiveChat />
      <Appbar />
      <AccountChecks />
      <Container className="mt-3">
        <LayoutHeader header={header} />
        <div className="content-spacer">{children}</div>
      </Container>
      <Footer />
    </Suspense>
  );
};

export default Layout;
