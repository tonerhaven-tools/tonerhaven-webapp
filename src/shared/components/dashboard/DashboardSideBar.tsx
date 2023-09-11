import useDashboardSidebar from "@/shared/hooks/store/useDashboardSidebar";
import SiteLogo from "../Logo";
import { Link } from "react-router-dom";

const DashboardSidebar = () => {
    return (
        <div className="dashboard-sidebar">
            <div className="sidebar-header">
                <SiteLogo />
            </div>
            <div className="navigation-items">
                <ul>
                    <li>
                        <Link to={"/dashboard/overview"}>Overview</Link>
                    </li>
                    <li>
                        <Link to={"/dashboard/products"}>Products</Link>
                    </li>
                </ul>
            </div>
            <div className="sidebar-footer">
                <p>&copy; 2023 Your Company</p>
            </div>
        </div>
    );
};

export default DashboardSidebar;
