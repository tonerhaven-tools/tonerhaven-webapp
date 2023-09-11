import { Button } from "react-bootstrap";
import { ReactNode } from "react";

interface LayoutHeaderProps {
    header?: string;
    options?: ReactNode;
}

const LayoutHeader: React.FC<LayoutHeaderProps> = ({
    header = undefined,
    options,
}) => {
    return (
        <div className="flex-between">
            <h4 hidden={!header}>
                <strong>{header}</strong>
            </h4>
            <div hidden={!options || !header}>
                {options}
            </div>
        </div>
    );
};

export default LayoutHeader;
