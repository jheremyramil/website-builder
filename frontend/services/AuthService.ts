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
    console.log(result);

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

    if (error.response && error.response.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error("Unable to login. Please try again.");
  }
}

export async function register(data: any) {
  try {
    console.log("Registering with:", data); // debug log

    const response = await axios.post(`${API_BASE_URL}/register`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Failed to Register", error.response?.data || error);
    throw error;
  }
}
