import React, { ReactNode, Suspense } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "react-bootstrap";
import LayoutHeader from "@/shared/components/LayoutHeader";
import { Toaster } from "react-hot-toast";
import NotAuthorized from "@/pages/401";
import { motion } from "framer-motion";

const AccountChecks = React.lazy(() => import("./AccountChecks"));
const LiveChat = React.lazy(() => import("./LiveChat"));
const Appbar = React.lazy(() => import("./Appbar"));
const Footer = React.lazy(() => import("./Footer"));

/// Contains layout that are required to be secured
interface SecuredLayoutProps {
    children: ReactNode;
    header?: string;
}

const SecuredLayout: React.FC<SecuredLayoutProps> = ({
    children,
    header = undefined,
}) => {
    const { isAuthenticated, isLoading, user } = useAuth0();

    if (isLoading)
        return (
            <>
                <Appbar />
                <Container className={"mt-3"}>
                    <div>Authenticating, please wait...</div>
                </Container>
                <Footer />
            </>
        );

    if (!isAuthenticated)
        return (
            <>
                <Appbar />
                <Container className={"mt-3"}>
                    <NotAuthorized />
                </Container>
                <Footer />
            </>
        );

    return (
        <Suspense>
            <LiveChat />
            <Appbar />
            <AccountChecks />
            <Toaster position="top-center" reverseOrder={false} />

            <Container className="mt-3">
                <LayoutHeader header={header} />

                <motion.div
                    className="content-spacer"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 100 }}
                >
                    {children}
                </motion.div>
            </Container>
            <Footer />
        </Suspense>
    );
};

export default SecuredLayout;
