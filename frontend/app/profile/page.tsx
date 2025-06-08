"use client";
import React, { useEffect, useState } from "react";
import { logoutAction } from "@/actions";
import { profile } from "@/services/ProfileService";
import {
  CircleUserRoundIcon,
  Mail,
  Settings,
  LogOut,
  Edit,
  Lock,
  Shield,
  Bell,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Skeleton,
} from "../../components/ui";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import UserAvatar from "@/components/Avatar/UserAvatar";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await profile();
        setUser(data);
      } catch {
        setUser({
          id: "guest",
          name: "Guest",
          email: "guest@example.com",
          created_at: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return <div>Error loading profile</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] font-sans text-gray-900">
      <div className="flex flex-1 flex-col">
        <header className="h-18 bg-white flex justify-end px-4 sm:px-8 items-center border-b border-gray-200 gap-x-6">
          <DashboardHeader />
        </header>

        <div className="w-full flex overflow-y-auto">
          <div className="w-full flex flex-col px-4 sm:px-6 py-6 max-w-7xl mx-auto">
            {/* Profile Header */}
            <div className="relative mb-6 sm:mb-8">
              {/* Cover Photo - Hidden on mobile, shown on sm+ */}
              <div className="hidden sm:block h-32 sm:h-48 w-full rounded-xl sm:rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-lg" />

              {/* Profile Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end sm:-mt-16 px-2 sm:px-6 gap-4 sm:gap-6">
                <div className="relative group">
                  <UserAvatar userId={user.id} size="lg" />
                </div>

                <div className="flex-1 space-y-2 sm:space-y-1">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                      {user.name}
                    </h1>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4">
                    <p className="text-sm sm:text-base text-gray-600 flex items-center">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      {user.email}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600">
                      Member since{" "}
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                  <Button
                    onClick={logoutAction}
                    className="rounded-full px-4 sm:px-6 gap-2 bg-gradient-to-r from-gray-900 via-gray-800 to-black hover:opacity-90 text-white text-xs sm:text-sm"
                    size="sm"
                  >
                    <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
              {/* Account Details Card */}
              <Card className="rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">
                    Account Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-gray-500">
                      Full Name
                    </p>
                    <p className="text-sm sm:text-base font-medium">
                      {user.name}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-gray-500">Email</p>
                    <p className="text-sm sm:text-base font-medium">
                      {user.email}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-gray-500">
                      Member Since
                    </p>
                    <p className="text-sm sm:text-base font-medium">
                      {new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Security Card */}
              <Card className="rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-1 sm:p-2 rounded-full bg-green-100">
                        <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm sm:text-base font-medium">
                          Password
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Last changed 3 months ago
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs sm:text-sm"
                    >
                      Change
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <div className="flex flex-1 flex-col">
        <header className="h-18 bg-white flex justify-end px-4 sm:px-8 items-center border-b border-gray-200 gap-x-6">
          <DashboardHeader />
        </header>

        <div className="w-full flex overflow-y-auto">
          <div className="w-full flex flex-col px-4 sm:px-6 py-6 max-w-7xl mx-auto">
            {/* Cover Skeleton - Hidden on mobile */}
            <Skeleton className="hidden sm:block h-32 sm:h-48 w-full rounded-xl sm:rounded-2xl mb-6 sm:mb-8" />

            {/* Profile Info Skeleton */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end sm:-mt-16 px-2 sm:px-6 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <Skeleton className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl sm:rounded-2xl" />

              <div className="flex-1 space-y-2 sm:space-y-3">
                <Skeleton className="h-6 sm:h-8 w-32 sm:w-64" />
                <Skeleton className="h-4 sm:h-5 w-40 sm:w-80" />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                <Skeleton className="h-8 sm:h-10 w-20 sm:w-24 rounded-full" />
                <Skeleton className="h-8 sm:h-10 w-20 sm:w-24 rounded-full" />
              </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
              <Skeleton className="h-48 sm:h-64 w-full rounded-xl sm:rounded-2xl" />
              <Skeleton className="h-48 sm:h-64 w-full rounded-xl sm:rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
