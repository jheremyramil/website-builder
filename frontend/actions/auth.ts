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
  } catch (error: any) {
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

    return {
      user: response.data.user,
      token: response.data.token,
      errors: null,
    };
  } catch (error: any) {
    return {
      user: null,
      token: null,
      errors: error.validationErrors || {
        general: ["Something went wrong. Try again."],
      },
    };
  }
}

export const logoutAction = async () => {
  await deleteSession();
  redirect("/login");
};
