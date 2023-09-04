import { useAuth0Client } from "./useAuth0Url";

const ResendVerification = (id: string) => {
  const client = useAuth0Client();

  client.post("/jobs/verification-email", {
    user_id: id,
  });
};

export { ResendVerification };
