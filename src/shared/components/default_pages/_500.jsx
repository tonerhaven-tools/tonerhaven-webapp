import DefaultPage from "./DefaultPage";

const InternalServerError = () => {
  return <DefaultPage statusCode={500} />;
};

export default InternalServerError;
