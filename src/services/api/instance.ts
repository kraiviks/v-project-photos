import axios from "axios";

// Use the correct url depending on if it's server or public
const apiUrl = "https://6720091ae7a5792f0530475f.mockapi.io/api";

// Create an axios instance
export const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
  headers: {
    Accept: "application/json",
  },
});
