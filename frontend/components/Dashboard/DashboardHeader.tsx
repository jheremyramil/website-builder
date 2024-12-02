"use client";
import { logoutAction } from "@/actions";
import { CircleUserRoundIcon } from "lucide-react";
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

const DashboardHeader = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center gap-x-2 rounded-xl bg-gray-100 px-4 py-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            <CircleUserRoundIcon className="h-8 w-8 stroke-current text-gray-400" />
          </AvatarFallback>
        </Avatar>

        <span className="text-sm leading-6 font-semibold">Administrator</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
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

  return <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>;
};
