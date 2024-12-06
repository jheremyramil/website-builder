import { CreatePageSchema } from "@/lib";
import { createPage, getAllPages } from "@/services";

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

export const getAllPageAction = async (page: number) => {
  try {
    const response = await getAllPages(page);
    return response;
  } catch (error) {
    console.error("Failed Creating Page", error);
  }
};
