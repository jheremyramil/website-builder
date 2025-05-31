"use client";

import { signinAction } from "@/actions";
import { Button, Input } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";

const Login = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [state, action, isPending] = useActionState(signinAction, undefined);

  useEffect(() => {
    if (state?.user && !isPending) {
      toast({
        title: "Welcome back!",
        description: `Hi, ${state?.user.name}!`,
        variant: "success",
      });

      router.push("/dashboard");
    }

    if (state?.errors?.form && !isPending) {
      toast({
        title: "Login failed",
        description: state.errors.form[0],
        variant: "destructive",
      });
    }
  }, [state, isPending, router, toast]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100">
      <div className="w-full  flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Login</h1>
            <p className="text-gray-500 mt-2">
              Enter your credentials to access your account
            </p>
          </div>

          <form action={action} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="pl-10 w-full py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {state?.errors?.email && (
                <p className="mt-1 text-sm text-red-600">
                  {state.errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="pl-10 w-full py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {state?.errors?.password && (
                <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                  <p className="font-medium">Password requirements:</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    {state.errors.password.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-6 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 rounded-lg shadow-sm"
              size="lg"
              disabled={isPending}
            >
              <span className="flex items-center justify-center">
                {isPending ? "Signing in..." : "Sign In"}
                {!isPending && <FiArrowRight className="ml-2 h-5 w-5" />}
              </span>
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
