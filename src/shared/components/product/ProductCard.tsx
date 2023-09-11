import { server_url } from "@/shared/http/ServerAxios";
import { Product } from "types/global.d.ts";
import { motion } from "framer-motion";
import { Card } from "react-bootstrap";
import useCart from "@/shared/hooks/store/useCheckout";
import { toast } from "react-hot-toast";
import ProductImage from "./ProductImage";
import React from "react";
import useAudio from "@/shared/hooks/useAudio";

import { useNavigate } from "react-router-dom";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();

    const { onCart, addCart } = useCart();
    const { toggle: playSuccess } = useAudio("/success.m4a");
    const { toggle: playFailed } = useAudio("/failed.m4a");

    const handleAdd = () => {
        const responses = {
            loading: "Adding to cart, please wait...",
            success: `Item ${product.name} added`,
            error: "Something went wrong.",
        };

        if (!onCart.some((item) => item.id == product.id)) {
            playSuccess();
            toast.promise(Promise.resolve(addCart(product)), responses);
        } else {
            playFailed();
            toast.error(`${product.name} already exists in the cart.`);
        }
    };

    const gotoProductDetails = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div className="col-md-3">
            <Card className="product border-0 bg-light">
                <ProductImage product={product} />
                <Card.Body style={{ cursor: "pointer" }} onClick={gotoProductDetails}>
                    <Card.Title className={"name"}>{product.name}</Card.Title>
                    <Card.Subtitle className={"price"}>
                        ${product.our_price}
                    </Card.Subtitle>
                </Card.Body>
                <Card.Footer className="border-0">
                    <button onClick={handleAdd} className={"add-cart"}>
                        🛒 Add to cart
                    </button>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default ProductCard;
