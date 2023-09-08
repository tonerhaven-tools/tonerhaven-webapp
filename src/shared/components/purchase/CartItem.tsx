import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "types/global.d.ts";
import ProductImage from "../product/ProductImage";
import QuantityControl from "./QuantityControl";
import useCheckout from "@/shared/hooks/store/useCheckout";

interface CartItemProps {
    item: Product;
    key: React.Key;
}

const CartItem: React.FC<CartItemProps> = ({ item, key }) => {
    const { removeItem } = useCheckout();

    return (
        <Card className="mb-3" key={key}>
            <Card.Body>
                <div className="flex-between ">
                    <div className="flex-between">
                        <img
                            className="m-1"
                            style={{ height: 110, width: 110 }}
                            src="/images/product.png"
                        />

                        <div>
                            <strong>
                                <Link target="_blank" to={`/products/${item.id}`}>
                                    {item.name}
                                </Link>
                            </strong>
                            <p>{item.color}</p>
                            <strong className="m-1">${item.our_price}</strong>
                        </div>
                    </div>
                    <div>
                        <div className="flex-between">
                            <QuantityControl onChange={(count) => { }} />
                            <p className="m-1" onClick={() => removeItem(item)}>
                                🗑️
                            </p>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CartItem;
