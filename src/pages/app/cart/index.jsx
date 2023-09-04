import { Layout, Page } from "@/shared/components";
import { Container } from "react-bootstrap";

const Cart = () => {
  return (
    <Page title={"Toner Haven | Your Cart"}>
      <Layout>
        <Container>
          <h1>Your cart</h1>
        </Container>
      </Layout>
    </Page>
  );
};
export default Cart;
