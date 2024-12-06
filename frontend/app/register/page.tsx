"use client";

import { signupAction } from "@/actions";
import { Button, Input } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const Register = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [state, action, isPending] = useActionState(signupAction, undefined);

  useEffect(() => {
    if (state?.errors?.email) {
      toast({
        title: "Something went wrong",
        description: "Email must be a valid email address format",
        variant: "destructive",
      });
    }

    if (state?.errors?.password) {
      toast({
        title: "Password validation fail!",
        description: "Password must meet the criteria",
        variant: "destructive",
      });
    }

    if (state?.user && !isPending) {
      toast({
        title: "Welcome!",
        description: `Hi, ${state?.user.name}!`,
        variant: "success",
      });

      const timeoutId = setTimeout(() => {
        router.push("/dashboard");
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [state?.user, isPending, router, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-950 gap-x-20">
      <div className="hidden lg:flex w-1/2 "></div>

      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md lg:w-1/2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Create an Account
        </h2>

        <Form action={action}>
          {/* Name Input  */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <Input type="text" name="name" placeholder="Name" required />
          </div>
          {state?.errors?.name && <p>{state.errors.name}</p>}

          {/* Email Input */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <Input type="email" name="email" placeholder="Email" required />
          </div>
          {state?.errors?.email && <p>{state.errors.email}</p>}

          {/* Password Input */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          {state?.errors?.password && (
            <div>
              <p className="text-gray-800 font-semibold">Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li className="text-red-600 text-sm " key={error}>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button
            type="submit"
            className="w-full mt-4"
            variant="default"
            size="lg"
            disabled={isPending}
          >
            {isPending ? "Creating an account..." : "Create account"}
          </Button>
        </Form>

        {/* Footer */}
        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
