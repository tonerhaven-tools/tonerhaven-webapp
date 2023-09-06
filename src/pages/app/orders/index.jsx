import { Layout, Page } from "@/shared/components";
import SecuredLayout from "@/shared/components/auth/SecuredLayout";
import { Container } from "react-bootstrap";

export default function Orders() {
  return (
    <Page title={"Toner Haven | Orders"}>
      <SecuredLayout>
        <h2>
          <strong>My Orders</strong>
        </h2>
      </SecuredLayout>
    </Page>
  );
}
