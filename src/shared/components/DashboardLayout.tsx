import React, { ReactNode, Suspense } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import DashboardSidebar from "./dashboard/DashboardSideBar";

/// Contains layout that are required to be secured
interface DashboardLayoutProps {
    children: ReactNode;
    header?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const { isAuthenticated, isLoading, user } = useAuth0();

    if (isLoading) return "Loading...";

    if (!isAuthenticated) return "Authenticating...";

    return (
        <Suspense>
            <div className="dashboard-container">
                <DashboardSidebar />
                <div className="dashboard-content">{children}</div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </Suspense>
    );
};

export default DashboardLayout;
