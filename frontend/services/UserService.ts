import { axiosInstance } from "@/lib";

export const fetchAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchUserById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updateUser = async (id: number, user: any) => {
  try {
    const response = await axiosInstance.put(`/user/${id}`, user);
    return response.data;
  } catch (error) {
    console.error("Error updating template:", error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
