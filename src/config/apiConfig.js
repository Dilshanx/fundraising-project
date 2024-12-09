import axios from "axios";

// Parse the environment configuration
const environmentConfig = {
  baseURL: "https://thecharity.online/api/v1",
};

// Create an Axios instance with the base configuration
const apiConfig = axios.create({
  baseURL: environmentConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
    // You can add other default headers here
  },
  // Optional: Add timeout
  timeout: 10000, // 10 seconds
});

export { apiConfig, environmentConfig };
