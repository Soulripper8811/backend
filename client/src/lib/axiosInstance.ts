import axios from "axios";

const axiosInsatnce = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});
export default axiosInsatnce;
