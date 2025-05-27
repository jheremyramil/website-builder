import { verifySession } from "@/lib";
import { cache } from "react";
import { axiosInstance } from "@/lib/axiosInstance";

export const getAllTemplates = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const response = await axiosInstance.get("/template");
    return response.data;
  } catch (error) {
    console.error("Failed to Get templates", error);
    return null;
  }
});

export const getTemplateById = cache(async (templateId: number) => {
  const session = await verifySession();
  if (!session) return null;

  if (!templateId) {
    throw new Error("Template ID is undefined");
  }

  try {
    const response = await axiosInstance.get(`template/${templateId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to Get template", error);
    return null;
  }
});

export const createTemplate = async (data: any) => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const response = await axiosInstance.post(`/template`, data);

    return response.data;
  } catch (error) {
    console.error("Failed to Create Template", error);
  }
};

export const updateTemplate = async (templateId: number, data: any) => {
  const session = await verifySession();
  if (!session) return null;

  if (!templateId) {
    throw new Error("Template ID is undefined");
  }

  try {
    const response = await axiosInstance.put(`template/${templateId}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to Update Template", error);
  }
};

export const deleteTemplate = async (templateId: number) => {
  const session = await verifySession();
  if (!session) return null;

  if (!templateId) {
    throw new Error("Template ID is undefined");
  }

  try {
    const response = await axiosInstance.put(`template/${templateId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to Delete Template", error);
  }
};
