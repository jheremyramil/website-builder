import axios from "axios";
import { axiosInstance, verifySession } from "@/lib";
import { cache } from "react";

const isBrowser = typeof window !== "undefined";

const API_BASE_URL = isBrowser
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : process.env.INTERNAL_API_BASE_URL;

export async function profile() {
  const session = await verifySession();
  if (!session) return null;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/profile/${session.userId}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
}
