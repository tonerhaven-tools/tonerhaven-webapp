import React from "react";
import { Button, Container } from "react-bootstrap";

interface DefaultPageProps {
  statusCode: number;
}

//https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const DefaultPage: React.FC<DefaultPageProps> = ({ statusCode }) => {
  const renderPage = () => {
    if (statusCode == 401)
      return (
        <div
          style={{
            margin: "auto",
            width: "50%",
            padding: "10px",
          }}
        >
          <img height={500} width={500} src="/images/defaults/noauth.png" />
          <p>Page not authorized</p>
          <Button>Login</Button>
        </div>
      );

    if (statusCode == 403) return <div></div>;

    if (statusCode == 404) return <div>Page not found</div>;

    if (statusCode == 500) return <div></div>;

    return <>Please specify the status code.</>;
  };

  return <Container fluid>{renderPage()}</Container>;
};

export default DefaultPage;
