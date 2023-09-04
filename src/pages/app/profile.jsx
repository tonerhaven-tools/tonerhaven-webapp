import { Layout, Page } from "@/shared/components";
import SecuredLayout from "@/shared/components/SecuredLayout";
import { Container } from "react-bootstrap";

export default function Profile() {
  return (
    <Page title={"Toner Haven | My Profile"}>
      <SecuredLayout>
        <Container>
          <h1>My Profile</h1>
        </Container>
      </SecuredLayout>
    </Page>
  );
}
