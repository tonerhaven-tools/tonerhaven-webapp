import { useState } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useCart from "@/shared/hooks/store/useCheckout";

// import { Product } from "types/global.d.ts";

interface CartButtonProps {
    isAuthenticated: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ isAuthenticated }) => {
    const { onCart } = useCart();

    const renderBadge = () => {
        return (
            <motion.div
                animate={{
                    x: [0, -1, 1, -1, 1, -1, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <Badge pill bg="danger">
                    {onCart.length}
                </Badge>
            </motion.div>
        );
    };

    return (
        <li hidden={!isAuthenticated} className="nav-item">
            <Link id="num_cart_items" className="nav-link" to={"/cart"}>
                <div className="flex-between">
                    <span>🛒 Cart </span>
                    {onCart.length > 0 ? <sup> {renderBadge()}</sup> : <></>}
                </div>
            </Link>
        </li>
    );
};

export default CartButton;
