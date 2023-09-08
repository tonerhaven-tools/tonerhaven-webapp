import { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { Plus, DashLg } from "react-bootstrap-icons";

interface QuantityControl {
    onChange: (count: number) => void;
}

const QuantityControl: React.FC<QuantityControl> = ({ onChange }) => {
    const [count, setCount] = useState(1);

    const increment = () => {
        const total = count + 1;
        if (total > 0) {
            setCount(total);
            onChange(total);
        }
    };

    const decrement = () => {
        const total = count - 1;

        if (total !== 1) {
            setCount(total);
            onChange(total);
        }

        if (count === 2) {
            setCount(1);
            onChange(1);
        }
    };

    return (
        <div className="flex-between m-1 justify-content-center align-items-center">
            <Button onClick={increment} variant="light" size="sm" className="m-1">
                <Plus />
            </Button>
            <FormControl
                onBlur={(e) => {
                    onChange(count);
                    setCount(parseInt(e.target.value));
                }}
                onChange={(e) => {
                    onChange(count);
                    setCount(parseInt(e.target.value));
                }}
                className="text-center"
                style={{ width: "100%", maxWidth: "80px" }}
                value={count}
            />
            <Button
                disabled={count <= 0}
                onClick={decrement}
                variant="light"
                size="sm"
                className="m-1"
            >
                <DashLg />
            </Button>
        </div>
    );
};

export default QuantityControl;
