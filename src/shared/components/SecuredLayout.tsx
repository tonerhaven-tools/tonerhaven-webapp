import { ReactNode } from "react";
import Appbar from "./Appbar";
import Footer from "./Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { NotAuthorized } from "./default_pages";
import { Container } from "react-bootstrap";
import CompleteProfilePrompt from "./prompts/CompleteProfilePrompt";

/// Contains layout that are required to be secured
interface SecuredLayoutProps {
    hasProfile: boolean;
    children: ReactNode;
}

const SecuredLayout: React.FC<SecuredLayoutProps> = ({
    children,
    hasProfile,
}) => {
    const { isAuthenticated, isLoading, user } = useAuth0();

    if (isLoading) return <div>Verifying account</div>;

    return (
        <>
            <Appbar />
            <CompleteProfilePrompt
                profileCompleted={false}
                authenticated={isAuthenticated}
            />
            <Container>{isAuthenticated ? children : <NotAuthorized />}</Container>
            <Footer />
        </>
    );
};

export default SecuredLayout;
