import DefaultPage from "./FallbackPage";

const Forbidden = () => {
  return <DefaultPage statusCode={403} />;
};

export default Forbidden;
