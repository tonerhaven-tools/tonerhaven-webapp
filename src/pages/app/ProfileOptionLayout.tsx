import { ReactNode } from "react";
import { Alert, Col, Container, ListGroup, Row } from "react-bootstrap";

interface ProfileOptionLayoutProps {
    children: ReactNode;
}

const ProfileOptionLayout: React.FC<ProfileOptionLayoutProps> = ({
    children,
}) => {
    return <>{children}</>;
};

export default ProfileOptionLayout;
