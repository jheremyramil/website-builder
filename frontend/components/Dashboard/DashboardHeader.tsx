"use client";
import React, { useEffect, useState } from "react";
import { logoutAction } from "@/actions";
import { CircleUserRoundIcon, House, LogOutIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui";
import { useRouter } from "next/navigation";
import { profile } from "@/services/ProfileService";
import UserAvatar from "../Avatar/UserAvatar";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

const DashboardHeader = () => {
  const [userName, setUserName] = useState("Loading...");
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await profile();
        setUser(data); // <--- This line was missing
        setUserName(data.name || "Unknown User");
      } catch {
        setUserName("Guest");
      }
    }

    fetchProfile();
  }, []);

  const navigateToProfile = () => {
    router.push("/profile");
  };

  const navigateToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center gap-x-2 rounded-xl bg-gray-100 px-4 py-2 hover:bg-gray-200 transition-colors">
        {user ? (
          <>
            <UserAvatar userId={user.id} size="sm" />
            <span className="text-sm leading-6 font-semibold">{userName}</span>
          </>
        ) : (
          <span className="text-sm leading-6 font-semibold">Loading...</span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={navigateToDashboard}>
          <House className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={navigateToProfile}>
          <CircleUserRoundIcon className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <LogoutItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardHeader;

const LogoutItem = () => {
  const handleLogout = async () => {
    try {
      await logoutAction();
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOutIcon className="mr-2 h-4 w-4" />
      Logout
    </DropdownMenuItem>
  );
};
