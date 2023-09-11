import { Container } from "react-bootstrap";
import React, { ReactNode, Suspense } from "react";
import LayoutHeader from "./LayoutHeader";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

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
        <motion.div
          className="content-spacer"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
        >
          {children}
        </motion.div>
      </Container>
      <Footer />
    </Suspense>
  );
};

export default Layout;
