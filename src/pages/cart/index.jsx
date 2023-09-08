import { Layout, Page } from "@/shared/components";
import CartItem from "@/shared/components/purchase/CartItem";
import { Button, Container, Table } from "react-bootstrap";
import useCart from "@/shared/hooks/store/useCheckout";

const Cart = () => {
  const { clearCart, onCart } = useCart();

  return (
    <Page title={"Toner Haven | Your Cart"}>
      <Layout
        header="Shopping Cart"
        headerOptions={
          <>
            <Button
              hidden={onCart.length <= 0}
              className="m-1"
              onClick={clearCart}
              size="sm"
              variant="outline-danger"
            >
              Remove all
            </Button>
          </>
        }
      >
        {onCart.length > 0 ? (
          <Table>
            <thead>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th />
            </thead>
            <tbody>
              {onCart.map((item, idx) => {
                return <CartItem item={item} key={idx} />;
              })}
            </tbody>
          </Table>
        ) : (
          <div>Your cart is empty</div>
        )}
        <div className="flex-between">
          <div />
          <Button hidden={onCart.length <= 0}>Checkout</Button>
        </div>
      </Layout>
    </Page>
  );
};
export default Cart;
