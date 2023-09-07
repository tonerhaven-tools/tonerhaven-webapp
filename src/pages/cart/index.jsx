import { Layout, Page } from "@/shared/components";
import { Button, Container } from "react-bootstrap";
import useCart from "@/shared/hooks/store/useCheckout";

const Cart = () => {
  const { clearCart } = useCart();

  return (
    <Page title={"Toner Haven | Your Cart"}>
      <Layout header="My Cart">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto alias
        magni voluptatem voluptatum illum impedit perferendis repudiandae sit
        earum saepe, quaerat placeat ipsum sunt eum dolore, harum quia est
        perspiciatis.
        <Button onClick={clearCart}>Clear Cart</Button>
      </Layout>
    </Page>
  );
};
export default Cart;
