import Props from "prop-types";
import Appbar from "./Appbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Appbar />
      <div style={{minHeight:'700px'}}>
        {children}
      </div>
      <Footer/>
    </>
  );
};

Layout.Props = {
  children: Props.node.isRequired,
};

export default Layout;
