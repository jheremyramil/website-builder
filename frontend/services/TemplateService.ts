import { axiosInstance, verifySession } from "@/lib";
import { cache } from "react";

export const fetchAllTemplates = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const response = await axiosInstance.get("/templates");

    return response.data;
  } catch (error) {
    console.error("Failed to fetch templates", error);
    return null;
  }
});
