import { verifySession } from "@/lib";
import { fetchAllTemplates } from "@/services";

export const getAllTemplateAction = async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const response = await fetchAllTemplates();
    return response;
  } catch (error) {
    console.error("Failed getting templates", error);
    return {
      message: "Failed to fetch templates",
    };
  }
};
