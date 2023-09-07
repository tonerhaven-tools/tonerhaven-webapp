import { Layout, Page } from "@/shared/components";
import SecuredLayout from "@/shared/components/auth/SecuredLayout";
import { Container } from "react-bootstrap";

export default function Orders() {
  return (
    <Page title={"Toner Haven | Orders"}>
      <SecuredLayout header="My Orders">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quis
        possimus, vel quos et quae voluptate repellat aliquam provident, at
        nesciunt natus rerum architecto rem nam impedit molestiae
        exercitationem? Suscipit!
      </SecuredLayout>
    </Page>
  );
}
