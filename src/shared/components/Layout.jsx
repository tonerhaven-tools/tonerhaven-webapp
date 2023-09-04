import Props from "prop-types";
import Appbar from "./Appbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ThreeDots from "./loaders/ThreeDots";
import { useLocation } from "react-router-dom";

const RenderLoading = () => {
  return <ThreeDots />;
};

const Layout = ({ children }) => {
  const location = useLocation();

  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [location.pathname]);

  return (
    <>
      <Appbar />
      {!isMounted ? RenderLoading() : <Container>{children}</Container>}
      <Footer />
    </>
  );
};

Layout.Props = {
  children: Props.node.isRequired,
};

export default Layout;
