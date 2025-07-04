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

export const getPagesByUserId = cache(
  async (userId: number, page = 1, searchTerm = "") => {
    const session = await verifySession();
    if (!session) return null;

    const user_id = session.userId;

    if (!userId) {
      throw new Error("User ID is undefined");
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/page/user/${user_id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          page,
          search: searchTerm, // 🔥 pass search term to backend
        },
      });

      console.log("Response from getPagesByUserId:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to get pages by user ID", error);
      return null;
    }
  }
);

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
  const session = await verifySession();
  if (!session) return null;

  const userId = session.userId;
  if (!userId) {
    throw new Error("User ID is undefined");
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/page/${userId}`, data, {
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

export const deletePageById = async (id: number) => {
  const res = await fetch(`${API_BASE_URL}/page/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete the page");
  }

  if (res.status === 204) {
    return;
  }

  return await res.json();
};

export const getAllPagesByUserId = cache(async (userId: number) => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/page/user/${userId}/all`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to get all pages by user ID", error);
    return null;
  }
});

export const getPageBySlug = cache(async (slug: string) => {
  const session = await verifySession();
  if (!session) return null;

  if (!slug) {
    throw new Error("Slug is undefined");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/page/slug/${slug}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data?.page;
  } catch (error) {
    console.error("Failed to get page by slug", error);
    return null;
  }
});
