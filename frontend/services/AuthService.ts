import axios from "axios";
import { axiosInstance } from "@/lib";

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export async function login(data: any) {
  try {
    const response = await axiosInstance.post("/login", data);

    return response.data;
  } catch (error) {
    console.error("Failed to login", error);
  }
}

export async function register(data: any) {
  try {
    const response = await axios.post(`${API_URL}/register`, data, {
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
