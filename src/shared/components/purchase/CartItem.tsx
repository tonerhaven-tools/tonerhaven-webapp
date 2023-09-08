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
                <div className="d-flex flex-row w-50">
                    <img
                        className="m-2"
                        style={{ height: 50, width: 50 }}
                        src="/images/product.png"
                    />
                    <div>
                        <h6>
                            <strong>{item.name}</strong>
                        </h6>
                        <p>{item.color}</p>
                    </div>
                </div>
            </td>
            <td className="w-25">
                <QuantityControl
                    onChange={(count) => {
                        setCount(count);
                    }}
                />
            </td>
            <td className="w-25">
                <strong>${parseInt(item.our_price as string) * currentCount}</strong>
            </td>
            <td>
                <Button variant="link" onClick={() => removeItem(item)}>
                    Remove
                </Button>
            </td>
        </tr>
    );
};

export default CartItem;
