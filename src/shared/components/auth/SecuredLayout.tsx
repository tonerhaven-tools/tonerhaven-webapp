import { ReactNode } from "react";
import Appbar from "@/shared/components/Appbar";
import Footer from "@/shared/components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { NotAuthorized } from "@/shared/components/default_pages";
import { Container } from "react-bootstrap";
import CompleteProfilePrompt from "@/shared/components/prompts/CompleteProfilePrompt";

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

    if (isLoading)
        return (
            <>
                <Appbar />
                <CompleteProfilePrompt
                    profileCompleted={false}
                    authenticated={isAuthenticated}
                />
                <Container>
                    <div>Authenticating, please wait...</div>
                </Container>
                <Footer />
            </>
        );

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
