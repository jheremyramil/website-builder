import axios from "axios";
import { axiosInstance, verifySession } from "@/lib";
import { cache } from "react";

const isBrowser = typeof window !== "undefined";

const API_BASE_URL = isBrowser
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : process.env.INTERNAL_API_BASE_URL;

export const getAllPages = cache(async (page = 1) => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const response = await axios.get(`${API_BASE_URL}/page`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get pages", error);
    return null;
  }
});

export const getPageById = cache(async (pageId: number) => {
  const session = await verifySession();
  if (!session) return null;

  if (!pageId) {
    throw new Error("Page ID is undefined");
  }

  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/page/${pageId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to Get page", error);
    return null;
  }
});

export const createPage = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/page`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Failed Creating Page:", error.message);
    throw error;
  }
};

export const updatePage = async (pageId: number, data: any) => {
  const session = await verifySession();
  if (!session) return null;

  if (!pageId) {
    throw new Error("Page ID is undefined");
  }

  try {
    const response = await axios.put(`${API_BASE_URL}/page/${pageId}`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to Update Page", error);
  }
};

export const deletePage = async (pageId: number) => {
  const session = await verifySession();
  if (!session) return null;

  if (!pageId) {
    throw new Error("Page ID is undefined");
  }

  try {
    const response = await axios.put(`${API_BASE_URL}/page/${pageId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to Delete Page", error);
  }
};
