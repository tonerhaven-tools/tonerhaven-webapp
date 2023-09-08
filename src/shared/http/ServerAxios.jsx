import Axios from "axios";

const server_url = import.meta.env.VITE_API_URL;
const ServerAxios = Axios.create({
  baseURL: server_url,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export default ServerAxios;
export {server_url};