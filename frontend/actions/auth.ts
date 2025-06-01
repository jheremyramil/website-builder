"use server";

import {
  createSession,
  FormState,
  SignupFormSchema,
  SigninFormSchema,
  deleteSession,
} from "@/lib";
import { login, register } from "@/services";
import { redirect } from "next/navigation";

export const signinAction = async (_: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      errors: {
        email: !email ? ["Email is required"] : undefined,
        password: !password ? ["Password is required"] : undefined,
      },
    };
  }

  try {
    const { user, token } = await login({
      email,
      password,
    });

    console.log("✅ Logged in User ID:", user.id);
    console.log("✅ Full User:", user);
    console.log("✅ Token:", token);

    await createSession(user.id, token);

    return {
      user,
      token,
    };
  } catch (error: any) {
    console.error("❌ Login error:", error);
    return {
      errors: {
        form: [error.message || "An error occurred. Please try again."],
      },
    };
  }
};

export async function signupAction(prevState: any, formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await register(data);
    console.log("✅ Register response:", response);

    const user = response?.user;
    const token = response?.token;

    if (!user || !token) {
      throw new Error("Invalid response structure from server.");
    }

    return {
      user,
      token,
      errors: null,
      success: true,
    };
  } catch (error: any) {
    console.error("Error in signupAction:", error);

    let errors = { general: ["Something went wrong. Please try again."] };

    if (error.response?.data?.data) {
      errors = error.response.data.data;
    } else if (error.message) {
      errors = { general: [error.message] };
    }

    return {
      user: null,
      token: null,
      errors,
      success: false,
    };
  }
}

export const logoutAction = async () => {
  await deleteSession();
  redirect("/login");
};
