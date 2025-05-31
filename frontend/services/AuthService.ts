import axios from "axios";
import { axiosInstance } from "@/lib";

const isBrowser = typeof window !== "undefined";

const API_BASE_URL = isBrowser
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : process.env.INTERNAL_API_BASE_URL;

export async function login(data: any) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result = response.data;

    // Laravel-style error handling
    if (result.success === false || !result.data) {
      throw new Error(result.message || "Login failed");
    }

    const { user, token } = result.data;

    if (!user || !token) {
      throw new Error("Invalid server response");
    }

    return { user, token };
  } catch (error: any) {
    console.error("Failed to login:", error);

    // Axios error from server (Laravel)
    if (error.response && error.response.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error("Unable to login. Please try again.");
  }
}

export async function register(data: any) {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result = response.data;

    // Handle Laravel-style structure
    if (result.success === false) {
      const error = new Error(result.message || "Registration failed") as any;
      error.validationErrors = result.errors;
      throw error;
    }

    return result;
  } catch (error: any) {
    console.error("Failed to Register", error);

    // If Laravel validation errors
    if (error.response && error.response.data?.errors) {
      const newError = new Error("Validation failed") as any;
      newError.validationErrors = error.response.data.errors;
      throw newError;
    }

    throw new Error("Registration failed. Please try again.");
  }
}
