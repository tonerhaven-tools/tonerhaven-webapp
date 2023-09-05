import useOnboarding from "@/shared/hooks/store/useOnboarding";
import { useAuth0 } from "@auth0/auth0-react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

interface CompleteProfilePromptProps { }

const CompleteProfilePrompt: React.FC<CompleteProfilePromptProps> = ({ }) => {
    const { isLoading, isAuthenticated, user } = useAuth0();
    const [profileCompleted, setCompleted] = useState(false);

    if (
        window.location.pathname.indexOf("/app/profile") !== -1 ||
        window.location.pathname === "/"
    )
        return;

    if (!isLoading && !isAuthenticated) return;

    const currentSub = user != undefined ? user.sub : "";

    useEffect(() => {
        Axios.get(`/api/profiles/ping/${currentSub}`).then((resp) => {
            if (resp.status == 200) {
                setCompleted(resp.data.exists);
            }
        });
    }, [currentSub]);

    if (profileCompleted) {
        return;
    }

    return (
        <Container className="mt-3">
            <Alert variant="warning" className=" p-3">
                Great to have you here! To make your experience even better, please take
                a moment to complete your profile information. 😊{" "}
                <Link className="btn btn-sm btn-outline-dark m-2" to={"/app/profile"}>
                    Manage profile
                </Link>
            </Alert>
        </Container>
    );
};

export default CompleteProfilePrompt;
