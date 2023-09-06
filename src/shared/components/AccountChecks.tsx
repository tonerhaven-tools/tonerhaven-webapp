import { useAuth0 } from "@auth0/auth0-react";
import Axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { from, distinctUntilChanged, distinct, mergeMap } from "rxjs";

import toast, { Toaster } from "react-hot-toast";

interface AccountCheckModel {
    id: number;
    title: string;
    route: string;
    messageTemplate: string;
    type: "info" | "warning" | "error" | "success";
}

interface AccountChecksProps { }

const parse = (template: string, values: any) =>
    template.replace(/{{(.*?)}}/g, (_, match) => values[match.trim()] || "");

const AccountChecks: React.FC<AccountChecksProps> = ({ }) => {
    const { user, isAuthenticated } = useAuth0();

    const [checks, setChecks] = useState<AccountCheckModel[]>([]);

    let observable = from(checks);

    if (isAuthenticated) {
        observable = from(checks).pipe(
            distinct((check) => check.id),
            distinctUntilChanged(),
            mergeMap((check) => {
                return from(
                    Axios.get(check.route, {
                        headers: {
                            auth_id: user?.sub,
                        },
                    }).then((resp) => Promise.resolve(check))
                );
            })
        );
    }

    useEffect(() => {
        const subscription = observable.subscribe({
            next: (response) => {
                toast(response?.messageTemplate, { icon: "👋" });
            },
            complete: () => {
                console.log("Observable completed");
            },
            error: (error) => {
                console.error("Observable error:", error);
            },
        });

        // Clean up the subscription when the component unmounts
        return () => {
            subscription.unsubscribe();
        };
    }, [checks]);

    useEffect(() => {
        Axios.get("/api/check/me").then((resp) => {
            let newData: AccountCheckModel[] = resp.data;
            setChecks(newData);
        });
    }, []);

    return <Toaster position="top-center" reverseOrder={false} />;
};

export default AccountChecks;
