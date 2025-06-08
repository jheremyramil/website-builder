import { CreatePageSchema } from "@/lib";
import { createPage, getAllPages, getPagesByUserId } from "@/services";

export const createPageAction = async (state: any, formData: FormData) => {
  const validatedFields = CreatePageSchema.safeParse({
    name: formData.get("name"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await createPage(validatedFields.data);
    const { page } = response;
    return { page };
  } catch (error) {
    console.error("Failed Creating Page", error);
  }
};

export const getPagesByUserAction = async (userId: number, page = 1) => {
  try {
    const response = await getPagesByUserId(userId, page);
    return response;
  } catch (error) {
    console.error("Failed fetching user's pages", error);
  }
};
