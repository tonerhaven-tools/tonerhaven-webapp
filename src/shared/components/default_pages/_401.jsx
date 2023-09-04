import DefaultPage from "./DefaultPage";

const NotAuthorized = () => {
  return <DefaultPage statusCode={401} />;
};

export default NotAuthorized;
