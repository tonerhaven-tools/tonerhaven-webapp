import Layout from "@/shared/components/Layout";
import Page from "@/shared/components/Page";
import { Button } from "react-bootstrap";
import { Cart, ChevronLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const ProductWishlist: React.FC = () => {
    return (
        <Page title={"My Wishlist"}>
            <Layout
                header="My Wish list"
                headerOptions={
                    <Link to={"/cart"}>
                        <Button size="sm"
                            className="p-2"
                            variant="light"
                            onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                });
                            }}
                        >
                            <Cart /> Go to cart
                        </Button>
                    </Link>
                }
            >
                <div>No wishlist yet</div>

                <div className="flex-between mt-5">
                    <div>
                        <div>
                            <div className="mt-5">
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
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </Layout>
        </Page>
    );
};

export default ProductWishlist;
