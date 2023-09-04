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
    if (window.location.pathname == "/app/profile") return;

    if (!authenticated) return;

    if (authenticated && profileCompleted) return;

    return (
        <Container>
            <Alert variant="warning" className="p-3">
                <div>
                    Great to have you here! To make your experience even better, please
                    take a moment to complete your profile information. 🌟{" "}
                    <Link className="btn" to={"/app/profile"}>
                        Manage my profile
                    </Link>
                </div>

                <div className="d-flex justify-content-end"></div>
            </Alert>
        </Container>
    );
};

export default CompleteProfilePrompt;
