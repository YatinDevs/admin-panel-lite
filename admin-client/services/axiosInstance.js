import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL_LITE;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export default axiosInstance;
