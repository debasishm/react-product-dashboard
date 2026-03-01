import axios from "axios";
import { API_BASE_URL } from "../constants/api.constants";

/**
 * Centralized Axios instance
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
