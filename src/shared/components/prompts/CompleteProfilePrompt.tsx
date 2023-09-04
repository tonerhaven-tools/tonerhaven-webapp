import { Alert, Container } from "react-bootstrap";

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
    if (!authenticated) return;

    if (authenticated && isVerified && profileCompleted) return;

    return (
        <Container>
            <Alert variant="warning">
                <div>
                    Great to have you here! To make your experience even better, please
                    take a moment to complete your profile information. 🌟
                </div>
            </Alert>
        </Container>
    );
};

export default CompleteProfilePrompt;
