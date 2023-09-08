import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "types/global.d.ts";
import ProductImage from "../product/ProductImage";
import QuantityControl from "./QuantityControl";
import useCheckout from "@/shared/hooks/store/useCheckout";
import { useState } from "react";

interface CartItemProps {
    item: Product;
    key: React.Key;
}

const CartItem: React.FC<CartItemProps> = ({ item, key }) => {
    const { removeItem } = useCheckout();

    const [currentCount, setCount] = useState(1);

    return (
        <tr className="p-4">
            <td>
                <div className="d-flex flex-row w-75">
                    <img
                        className="m-2"
                        style={{ height: 50, width: 50 }}
                        src="/images/product.png"
                    />
                    <div>
                        <small>
                            <strong>{item.name}</strong>
                        </small>
                    </div>
                </div>
            </td>
            <td className="text-center">
                <small>{item.color}</small>
            </td>
            <td className="w-25">
                <QuantityControl
                    onChange={(count) => {
                        setCount(count);
                    }}
                />
            </td>
            <td className="w-25 text-center">
                <small>
                    <strong>${parseInt(item.our_price as string) * currentCount}</strong>
                </small>
            </td>
            <td>
                <Button size="sm" variant="link" onClick={() => removeItem(item)}>
                    Remove
                </Button>
            </td>
        </tr>
    );
};

export default CartItem;
