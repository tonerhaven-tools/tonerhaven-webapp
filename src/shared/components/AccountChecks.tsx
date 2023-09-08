import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode, useEffect, useState } from "react";
import { from, distinctUntilChanged, distinct, mergeMap } from "rxjs";

import toast, { Toaster } from "react-hot-toast";
import ServerAxios from "../http/ServerAxios";

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

    useEffect(() => {
        ServerAxios.get(`/api/check/me`).then((resp) => {
            if (resp.status == 200) {
                let newData: AccountCheckModel[] = resp.data;
                if (checks !== newData) {
                    setChecks(newData);
                    console.log(newData);
                }
            }
        });
        return () => { };
    }, []);

    if (isAuthenticated && checks.length > 0) {
        observable = from(checks).pipe(
            distinct((check) => check.id),
            mergeMap((check) => {
                return from(
                    ServerAxios.get(check.route, {
                        headers: {
                            auth_id: user?.sub,
                        },
                    }).then(() => Promise.resolve(check))
                );
            })
        );
    }

    useEffect(() => {
        const subscription = observable.subscribe({
            next: (response) => {
                // toast(
                //     (t) => (
                //         <span>
                //             <strong>{response.title}</strong>
                //             <div>
                //                 <small>{response.messageTemplate}</small>
                //             </div>
                //         </span>
                //     ),
                //     {
                //         icon: renderStatus(response),
                //     }
                // );
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
    }, [checks, isAuthenticated]);

    const renderStatus = (value: AccountCheckModel) => {
        switch (value.type) {
            case "info":
                return "💬";

            case "success":
                return "✔️";

            case "warning":
                return "⚠️";

            case "error":
                return "❌";

            default:
                return "👋";
        }
    };

    if (!isAuthenticated) return;

    return <></>;
};

export default AccountChecks;
