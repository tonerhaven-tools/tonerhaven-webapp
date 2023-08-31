import Props from "prop-types";

const Page = ({ title, children }) => {
  return (
    <>
      <title>{title}</title>
      {children}
    </>
  );
};

Page.Props = {
  title: Props.string.isRequired,
  children: Props.node,
};

export default Page;
