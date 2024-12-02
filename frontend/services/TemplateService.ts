import { axiosInstance } from "@/lib";

export async function fetchAllTemplates() {
  try {
    const response = await axiosInstance.get("/templates");

    return response.data;
  } catch (error) {
    console.error("Failed to login", error);
  }
}
