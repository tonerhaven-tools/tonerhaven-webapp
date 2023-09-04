import { Layout, Page } from "@/shared/components";
import SecuredLayout from "@/shared/components/auth/SecuredLayout";
import { Container } from "react-bootstrap";
import ProfileOptionLayout from "../ProfileOptionLayout";

export default function BankDetails() {
  return (
    <Page title={"Toner Haven | Contact Info"}>
      <SecuredLayout>
        <ProfileOptionLayout>Bank Details</ProfileOptionLayout>
      </SecuredLayout>
    </Page>
  );
}
