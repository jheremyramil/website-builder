"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { decrypt } from "./session";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL! || "http://localhost:8000/api",
  timeout: 10000,
  withXSRFToken: true,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage (since cookie is HTTP-only)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common error responses, e.g., 401 Unauthorized
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Please log in again");
    }
    return Promise.reject(error);
  }
);
