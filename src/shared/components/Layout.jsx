import Props from "prop-types";
import Appbar from "./Appbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Appbar />
      {children}
      <Footer/>
    </>
  );
};

Layout.Props = {
  children: Props.node.isRequired,
};

export default Layout;
