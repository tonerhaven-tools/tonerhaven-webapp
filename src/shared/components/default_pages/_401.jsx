import DefaultPage from "./FallbackPage";

const NotAuthorized = () => {
  return <DefaultPage statusCode={401} />;
};

export default NotAuthorized;
