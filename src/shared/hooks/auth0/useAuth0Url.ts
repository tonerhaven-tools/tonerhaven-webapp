import axios from "axios";

const useUrl = (route: string) =>
  `https://dev-wy7vwm5m.us.auth0.com/api/v2/${route}`;

const useAuth0Client = () =>
  axios.create({
    baseURL: `https://dev-wy7vwm5m.us.auth0.com/api/v2`,
  });

export { useUrl, useAuth0Client };
