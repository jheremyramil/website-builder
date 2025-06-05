import axios from "axios";
import { axiosInstance, verifySession } from "@/lib";
import { cache } from "react";

const isBrowser = typeof window !== "undefined";

const API_BASE_URL = isBrowser
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : process.env.INTERNAL_API_BASE_URL;

interface ProfileResponse {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export async function profile(): Promise<ProfileResponse> {
  const session = await verifySession();
  if (!session)
    return {
      id: "guest",
      name: "Guest",
      email: "guest@example.com",
      created_at: new Date().toISOString(),
    };

  try {
    const response = await axios.get<ProfileResponse>(
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
