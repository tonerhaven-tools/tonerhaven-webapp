import Layout from "@/shared/components/Layout";
import Page from "@/shared/components/Page";
import { useParams } from "react-router-dom";

interface ProductDetailProps { }

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { id } = useParams();
  return (
    <Page title="Toner Haven | Product Information">
      <Layout header="Product Information">
        <div>{id}</div>
      </Layout>
    </Page>
  );
};

export default ProductDetail;
