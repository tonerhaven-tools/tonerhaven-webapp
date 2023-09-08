import { Container } from "react-bootstrap";
import React, { ReactNode, Suspense } from "react";
import LayoutHeader from "./LayoutHeader";
import { Toaster } from "react-hot-toast";

const AccountChecks = React.lazy(() => import("./AccountChecks"));
const LiveChat = React.lazy(() => import("./LiveChat"));
const Appbar = React.lazy(() => import("./Appbar"));
const Footer = React.lazy(() => import("./Footer"));

interface LayoutProps {
  children: ReactNode;
  header?: string;
  headerOptions?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  header = undefined,
  headerOptions = undefined,
}) => {
  return (
    <Suspense>
      <LiveChat />
      <Appbar />
      <AccountChecks />
      <Toaster position="top-center" reverseOrder={false} />
      <Container className="mt-3">
        <LayoutHeader header={header} options={headerOptions} />
        <div className="content-spacer">{children}</div>
      </Container>
      <Footer />
    </Suspense>
  );
};

export default Layout;