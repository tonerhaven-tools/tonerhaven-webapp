import useDashboardSidebar from "@/shared/hooks/store/useDashboardSidebar";
import SiteLogo from "../Logo";
import { Link } from "react-router-dom";
import { Button, CloseButton } from "react-bootstrap";
import {
    BoxArrowInDownRight,
    BoxArrowRight,
    DoorClosed,
} from "react-bootstrap-icons";

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
                <Link to={"/"}>
                    <Button variant="outline-danger" className="w-100">
                        Leave Dashboard <BoxArrowRight />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default DashboardSidebar;
