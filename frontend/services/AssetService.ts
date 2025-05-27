import axios from "axios";

import { verifySession } from "@/lib";
import { cache } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export const fetchAllAssets = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const response = await axios.get(`${API_BASE_URL}/assets`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get pages", error);
    return null;
  }
});
