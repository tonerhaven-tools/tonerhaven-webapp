import { ReactNode } from "react";
import {
    Alert,
    Col,
    Container,
    ListGroup,
    Nav,
    Row,
    Tab,
} from "react-bootstrap";
import { Link } from "react-router-dom";

interface ProfileOptionRoutes {
    path: string;
    text: string;
}

interface ProfileOptionLayoutProps {
    children: ReactNode;
}

const routes: ProfileOptionRoutes[] = [
    {
        path: "/app/profile",
        text: "Basic Details",
    },

    {
        path: "/app/profile/bank-details",
        text: "Payment method",
    },
];

const ProfileOptionLayout: React.FC<ProfileOptionLayoutProps> = ({
    children,
}) => {
    return (
        <div>
            <h1>Account Details</h1>
            <Tab.Container>
                <Row className="p-3">
                    <Col xl={2}>
                        <Nav variant="pills" className="flex-column">
                            {routes.map((item, idx) => {
                                return (
                                    <Link className="nav-item" key={idx} to={item.path}>
                                        {item.text}
                                    </Link>
                                );
                            })}
                        </Nav>
                    </Col>
                    <Col>{children}</Col>
                </Row>
            </Tab.Container>
        </div>
    );
};

export default ProfileOptionLayout;
