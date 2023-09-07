import React, { ReactNode, Suspense } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NotAuthorized } from "@/shared/components/default_pages";
import { Container } from "react-bootstrap";

const AccountChecks = React.lazy(() => import("../AccountChecks"));
const LiveChat = React.lazy(() => import("../LiveChat"));
const Appbar = React.lazy(() => import("../Appbar"));
const Footer = React.lazy(() => import("../Footer"));


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
                <Container>
                    <div>Authenticating, please wait...</div>
                </Container>
                <Footer />
            </>
        );

    return (
        <Suspense fallback={<div>Loading..</div>}>
            <Appbar />
            <AccountChecks />
            <Container className="mt-3">
                {isAuthenticated ? children : <NotAuthorized />}
            </Container>
            <Footer />
        </Suspense>
    );
};

export default SecuredLayout;
