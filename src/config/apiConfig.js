// export default apiConfig;
import axios from "axios";

const apiConfig = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // This is the crucial update!
});

export default apiConfig;
