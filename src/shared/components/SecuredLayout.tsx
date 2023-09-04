import { ReactNode } from "react";
import Appbar from "./Appbar";
import Footer from "./Footer";
import { useAuth0 } from "@auth0/auth0-react";
import { NotAuthorized } from "./default_pages";

/// Contains layout that are required to be secured
interface SecuredLayoutProps {
    children: ReactNode;
}

const SecuredLayout: React.FC<SecuredLayoutProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return <div>Verifying account</div>;

    return (
        <>
            <Appbar />
            {isAuthenticated ? children : <NotAuthorized />}
            <Footer />
        </>
    );
};

export default SecuredLayout;
