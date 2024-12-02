import { axiosInstance } from "@/lib";

export async function login(email: string, password: string) {
  try {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to login", error);
  }
}

export async function register(name: string, email: string, password: string) {
  try {
    const response = await axiosInstance.post("/register", {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to Register", error);
  }
}
