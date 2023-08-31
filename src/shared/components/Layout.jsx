import Props from "prop-types";
import Appbar from "./Appbar";

const Layout = ({ children }) => {
  return (
    <>
      <Appbar />
      {children}
    </>
  );
};

Layout.Props = {
  children: Props.node.isRequired,
};

export default Layout;
