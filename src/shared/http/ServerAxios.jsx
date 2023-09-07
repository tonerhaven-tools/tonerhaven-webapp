import Axios from "axios";
const server_url = import.meta.env.VITE_API_URL;
const ServerAxios = Axios.create({
  baseURL: server_url
});

export default ServerAxios;
export { server_url };
