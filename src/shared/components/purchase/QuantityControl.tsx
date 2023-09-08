import { useState } from "react";
import { Button, FormControl } from "react-bootstrap";

interface QuantityControl {
    onChange: (count: number) => void;
}

const QuantityControl: React.FC<QuantityControl> = ({ onChange }) => {
    const [count, setCount] = useState(1);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    return (
        <div className="flex-between m-1">
            <Button onClick={increment} variant="light" size="sm" className="m-1">
                +
            </Button>
            <FormControl
                className="text-center"
                style={{ width: "100px" }}
                value={count}
            />
            <Button
                disabled={count === 1}
                onClick={decrement}
                variant="light"
                size="sm"
                className="m-1"
            >
                -
            </Button>
        </div>
    );
};

export default QuantityControl;
