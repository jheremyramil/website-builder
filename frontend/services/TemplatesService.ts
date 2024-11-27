import { axiosInstance } from "@/lib";

export const fetchTemplates = async () => {
  try {
    const response = await axiosInstance.get("/templates");
    return response.data;
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw error;
  }
};

export const fetchTemplateById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/templates/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching template by ID:", error);
    throw error;
  }
};

export const createTemplate = async (templateData: any) => {
  try {
    const response = await axiosInstance.post("/templates", templateData);
    return response.data;
  } catch (error) {
    console.error("Error creating template:", error);
    throw error;
  }
};

export const updateTemplate = async (id: string, templateData: any) => {
  try {
    const response = await axiosInstance.put(`/templates/${id}`, templateData);
    return response.data;
  } catch (error) {
    console.error("Error updating template:", error);
    throw error;
  }
};

export const deleteTemplate = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/templates/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting template:", error);
    throw error;
  }
};
