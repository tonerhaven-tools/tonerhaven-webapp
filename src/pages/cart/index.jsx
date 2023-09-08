import { Layout, Page } from "@/shared/components";
import CartItem from "@/shared/components/purchase/CartItem";
import { Button, Container, Table } from "react-bootstrap";
import useCart from "@/shared/hooks/store/useCheckout";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BagCheck,
  Cart2,
  CartPlus,
  ChevronLeft,
} from "react-bootstrap-icons";

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
              <th className="text-center">Product</th>
              <th className="text-center">Color</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Total Price</th>
              <th />
            </thead>
            <tbody>
              {onCart.map((item, idx) => {
                return <CartItem item={item} key={idx} />;
              })}
            </tbody>
          </Table>
        ) : (
          <div className="m-5">
            Hello there! Your shopping cart is currently empty. Feel free to
            explore our fantastic products and add them to your cart whenever
            you're ready. Happy shopping!
          </div>
        )}
        <div className="flex-between">
          <Link to={"/products"}>
            <Button
              className="p-2"
              variant="light"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <ChevronLeft className="m-1" />
              <span className="m-1">Continue Shopping</span>
            </Button>
          </Link>
          <Button className="p-2" hidden={onCart.length <= 0}>
            <BagCheck className="m-1" />
            <span className="m-1">Checkout</span>
          </Button>
        </div>
      </Layout>
    </Page>
  );
};
export default Cart;
