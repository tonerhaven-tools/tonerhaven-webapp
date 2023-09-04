import DefaultPage from "./FallbackPage";

const InternalServerError = () => {
  return <DefaultPage statusCode={500} />;
};

export default InternalServerError;
