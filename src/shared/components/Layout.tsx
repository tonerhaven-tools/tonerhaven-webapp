import { Container } from "react-bootstrap";
import React, { ReactNode, Suspense } from "react";
import LayoutHeader from "./LayoutHeader";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import OnLoadAnimator from "./OnLoadAnimator";

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
        <OnLoadAnimator>{children}</OnLoadAnimator>
      </Container>
      <Footer />
    </Suspense>
  );
};

export default Layout;
