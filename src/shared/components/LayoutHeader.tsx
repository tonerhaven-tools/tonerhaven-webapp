interface LayoutHeaderProps {
    header?: string;
}

const LayoutHeader: React.FC<LayoutHeaderProps> = ({ header = undefined }) => {
    return (
        <h2 hidden={!header}>
            <strong>{header}</strong>
        </h2>
    );
};

export default LayoutHeader;