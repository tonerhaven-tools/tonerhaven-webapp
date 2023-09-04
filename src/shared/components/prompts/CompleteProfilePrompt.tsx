import { Alert, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

interface CompleteProfilePromptProps {
    isVerified: boolean;
    authenticated: boolean;
    profileCompleted: boolean;
}

const CompleteProfilePrompt: React.FC<CompleteProfilePromptProps> = ({
    isVerified,
    authenticated,
    profileCompleted,
}) => {
    if (window.location.pathname == "/app/profile") return;

    if (!authenticated) return;

    if (authenticated && isVerified && profileCompleted) return;

    return (
        <Container>
            <Alert variant="warning">
                <div>
                    Great to have you here! To make your experience even better, please
                    take a moment to complete your profile information. 🌟
                </div>

                <div className="d-flex justify-content-end">
                    <Link to={"/app/profile"}>
                        <Button variant="outlined-light">Manage Profile</Button>
                    </Link>
                </div>
            </Alert>
        </Container>
    );
};

export default CompleteProfilePrompt;
