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
  return (
    <>
      <Appbar />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

Layout.Props = {
  children: Props.node.isRequired,
};

export default Layout;
