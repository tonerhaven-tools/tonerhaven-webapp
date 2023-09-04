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
        <div>
          Access Denied: Authentication is required to access this resource.
          Please provide valid credentials or contact our support team for
          assistance.
        </div>
      );

    if (statusCode == 403)
      return (
        <div>
          Access Forbidden: You do not have the necessary permissions to view
          this content. To request access, please reach out to our administrator
          or support team.
        </div>
      );

    if (statusCode == 404)
      return (
        <div>
          Page Not Found: The requested resource is currently unavailable. If
          you believe this is an error, please double-check the URL or contact
          our support team for further assistance.
        </div>
      );

    if (statusCode == 500)
      return (
        <div>
          Internal Server Error: We are experiencing technical difficulties on
          our server, and our team is diligently working to resolve the issue.
          We apologize for any inconvenience caused and appreciate your patience
          as we work to restore normal operations.
        </div>
      );

    return <>Please specify the status code.</>;
  };

  return <Container fluid>{renderPage()}</Container>;
};

export default DefaultPage;
