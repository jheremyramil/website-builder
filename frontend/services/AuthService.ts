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
    return response.data;
  } catch (error) {
    console.error("Failed to login", error);
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
    return response.data;
  } catch (error) {
    console.error("Failed to Register", error);
  }
}
