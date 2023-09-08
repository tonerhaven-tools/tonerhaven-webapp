import { server_url } from "@/shared/http/ServerAxios";
import { Product } from "types/global.d.ts";
import { motion } from "framer-motion";
import { Card } from "react-bootstrap";
import useCart from "@/shared/hooks/store/useCheckout";
import { toast } from "react-hot-toast";
import ProductImage from "./ProductImage";
import React from "react";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { onCart, addCart } = useCart();

    return (
        <motion.div
            className="col-md-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
        >
            <Card className="product border-0 bg-light">
                <ProductImage product={product} />
                <Card.Body>
                    <Card.Title className={"name"}>{product.name}</Card.Title>
                    <Card.Subtitle className={"price"}>
                        ${product.our_price}
                    </Card.Subtitle>
                </Card.Body>
                <Card.Footer className="border-0">
                    <button
                        onClick={() => {
                            const responses = {
                                loading: "Adding to cart, please wait...",
                                success: `Item ${product.name} added`,
                                error: "Something went wrong.",
                            };

                            if (!onCart.some((item) => item.id == product.id)) {
                                toast.promise(Promise.resolve(addCart(product)), responses);
                            } else {
                                toast.error(`${product.name} already exists in the cart.`);
                            }
                        }}
                        className={"add-cart"}
                    >
                        🛒 Add to cart
                    </button>
                </Card.Footer>
            </Card>
        </motion.div>
    );
};

export default ProductCard;
