import { Layout, Page } from "@/shared/components";
import SecuredLayout from "@/shared/components/SecuredLayout";
import { Container } from "react-bootstrap";

export default function Orders() {
  return (
    <Page title={"Toner Haven | Orders"}>
      <SecuredLayout>
        <Container>
          <h1>My Orders</h1>
        </Container>
      </SecuredLayout>
    </Page>
  );
}
