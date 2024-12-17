import axios from "axios";

const apiConfig = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default apiConfig;
