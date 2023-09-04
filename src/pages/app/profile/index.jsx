import { Layout, Page } from "@/shared/components";
import SecuredLayout from "@/shared/components/SecuredLayout";
import { Container } from "react-bootstrap";
import ProfileOptionLayout from "../ProfileOptionLayout";

export default function Profile() {
  return (
    <Page title={"Toner Haven | My Profile"}>
      <SecuredLayout>
        <ProfileOptionLayout>
          <div>Test</div>
        </ProfileOptionLayout>
      </SecuredLayout>
    </Page>
  );
}
