import { Alert, Container } from "react-bootstrap";

interface VerifyPromptProps {
    isVerified: boolean;
    authenticated: boolean;
}

const VerifyPrompt: React.FC<VerifyPromptProps> = ({
    isVerified,
    authenticated,
}) => {
    if (authenticated && isVerified) return;

    return (
        <Container>
            <Alert variant="warning">
                <div>
                    We're excited to have you, but it looks like this account hasn't been
                    verified yet. 😊
                </div>
            </Alert>
        </Container>
    );
};

export default VerifyPrompt;
