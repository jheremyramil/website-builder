import { axiosInstance } from "@/lib";

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    // Get CSRF Token
    await axiosInstance.get("/sanctum/csrf-cookie");

    const response = await axiosInstance.post("/login", {
      email,
      password,
    });

    // Store token in localStorage

    const { token } = response.data;
    localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    console.error("Error loggin in:", error);
    throw error;
  }
};

export const signUp = async (formData: any) => {
  try {
    const response = await axiosInstance.post("/register", { formData });
    return response.data;
  } catch (error) {
    console.error("Error loggin in:", error);
    throw error;
  }
};
