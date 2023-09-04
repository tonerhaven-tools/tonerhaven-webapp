import { Layout, Page } from "@/shared/components";
import { NotAuthorized } from "@/shared/components/default_pages";

const Root = () => {
  return (
    <Page title={"Toner Haven | Your one stop shop for toners!"}>
      <Layout>
        <NotAuthorized />
      </Layout>
    </Page>
  );
};

export default Root;
