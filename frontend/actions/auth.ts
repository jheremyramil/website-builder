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
    const { user, token } = await login({ email, password });
    await createSession(user.id, token);
    return { user };
    console.log("User logged in successfully:", user);
  } catch {
    return { errors: { form: ["Invalid email or password"] } };
  }
};

export const signupAction = async (state: FormState, formData: FormData) => {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // register
    const response = await register(validatedFields.data);

    const { user, token } = response;

    if (!user || !token) {
      return {
        success: false,
        message: "Failed to create an account. Please try again.",
      };
    }

    await createSession(user.id, token);

    return { user };
  } catch (error: any) {
    console.error("Sign-up error:", error);
    return {
      success: false,
      message: error.message || "An error occurred while creating an account.",
    };
  }
};

export const logoutAction = async () => {
  await deleteSession();
  redirect("/login");
};
