import { Layout, Page } from "@/shared/components";
import { Link } from "react-router-dom";
import { Col, Container, Row, Button } from "react-bootstrap";
import { BagCheck, ChevronLeft, Heart } from "react-bootstrap-icons";
import CartTable from "@/shared/components/purchase/CartTable";
import useCart from "@/shared/hooks/store/useCheckout";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { clearCart, onCart } = useCart();
  const navigate = useNavigate();
  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Page title={"Toner Haven | Your Cart"}>
      <Layout
        header="Shopping Cart"
        headerOptions={
          <>
            <Link to={"/products/wishlist"}>
              <Button variant="outline-dark" className="m-1" size="sm">
                <Heart /> My Wishlist
              </Button>
            </Link>
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
              <ChevronLeft /> Continue Shopping
            </Button>
          </Link>
          <Button
            onClick={goToCheckout}
            className="p-2"
            hidden={onCart.length <= 0}
          >
            <BagCheck /> Checkout
          </Button>
        </div>
      </Layout>
    </Page>
  );
};
export default Cart;
