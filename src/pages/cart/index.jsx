import { Layout, Page } from "@/shared/components";
import { Link } from "react-router-dom";

import { Col, Container, Row, Button } from "react-bootstrap";
import { BagCheck, ChevronLeft } from "react-bootstrap-icons";
import CartTable from "@/shared/components/purchase/CartTable";
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
        <CartTable />
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
