import { Alert, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

interface CompleteProfilePromptProps {
    authenticated: boolean;
    profileCompleted: boolean;
}

const CompleteProfilePrompt: React.FC<CompleteProfilePromptProps> = ({
    authenticated,
    profileCompleted,
}) => {
    if (
        window.location.pathname.indexOf("/app/profile") !== -1 ||
        window.location.pathname === "/"
    )
        return;

    if (!authenticated) return;

    if (authenticated && profileCompleted) return;

    return (
        <Container className="mt-3">
            <Alert variant="warning" className=" p-3">
                Great to have you here! To make your experience even better, please take
                a moment to complete your profile information. 😊{" "}
                <Link className="btn btn-sm btn-outline-dark m-2" to={"/app/profile"}>
                    Manage profile
                </Link>
            </Alert>
        </Container>
    );
};

export default CompleteProfilePrompt;
