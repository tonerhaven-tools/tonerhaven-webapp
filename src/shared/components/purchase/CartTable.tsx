import CartItem from "@/shared/components/purchase/CartItem";
import { Button, Container, Table } from "react-bootstrap";
import useCart from "@/shared/hooks/store/useCheckout";

interface CartTableProps { }

const CartTable: React.FC<CartTableProps> = () => {
    const { clearCart, onCart } = useCart();

    return onCart.length > 0 ? (
        <Table>
            <thead>
                <tr>
                    <th className="text-center">Product</th>
                    <th className="text-center">Color</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Total Price</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {onCart.map((item, idx) => {
                    return <CartItem item={item} key={idx} />;
                })}
            </tbody>
        </Table>
    ) : (
        <div className="m-5">
            Hello there! Your shopping cart is currently empty. Feel free to explore
            our fantastic products and add them to your cart whenever you're ready.
            Happy shopping!
        </div>
    );
};

export default CartTable;
