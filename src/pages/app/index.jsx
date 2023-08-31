import { Layout, Page } from "@/shared/components";
import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "react-bootstrap";

const Root = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Page title={"Toner Haven | Your one stop shop for toners!"}>
      <Layout>
        <Container>
          {isAuthenticated ? (
            <h1>Welcome {user.nickname ?? ""}</h1>
          ) : (
            <h1>Welcome to TonerHaven!</h1>
          )}
        </Container>
      </Layout>
    </Page>
  );
};

export default Root;
