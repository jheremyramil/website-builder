"use client";

import {
  ChevronDownIcon,
  CircleArrowLeftIcon,
  CircleUserRoundIcon,
  EyeIcon,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import Devices from "./Devices";
import Tools from "./Tools";
import Link from "next/link";
import { logoutAction } from "@/actions";

const Navbar = () => {
  return (
    <div className="flex h-screen flex-1 flex-col">
      <header className="h-18 bg-white flex justify-between px-8 items-center border-b border-gray-200 gap-x-6">
        <div className="flex items-center justify-center gap-x-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center rounded-xl p-2"
          >
            <CircleArrowLeftIcon className="h-6 w-6 stroke-current text-gray-400" />
          </Link>

          {/* Show page details  */}
          <button className="flex flex-col rounded-xl border border-gray-200 bg-gray-100 px-6 py-2">
            <div className="flex items-center gap-x-2">
              <span className="text-sm">Page: Homepage - Dipa</span>
              <ChevronDownIcon className="h-5 w-5 stroke-current text-gray-400" />
            </div>
            <div className="text-xs text-gray-400">
              https://domain@example.com
            </div>
          </button>

          {/* Preview Website  */}
          <button className="flex items-center justify-center gap-x-2 rounded-xl bg-gray-100 px-4 py-2">
            <EyeIcon className="h-5 w-5 stroke-current text-gray-400" />
            <span className="text-sm font-semibold leading-6">Preview</span>
          </button>
        </div>

        <div className="flex gap-x-3">
          {/* Panel Devices  */}
          {/* <div className="panel__devices"></div>
          <div className="panel__editor"></div>
          <div className="panel__basic-actions"></div> */}

          <Devices />
          <Tools />
        </div>

        <div className="flex gap-x-3 items-center">
          <div className="flex h-18 items-center gap-x-4 border-b border-gray-200 px-6">
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Save
            </Button>
            <Button className="bg-green-400 text-gray-200 hover:bg-green-600 hover:text-white transition duration-300">
              Save & Publish
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center gap-x-2 rounded-xl bg-gray-100 px-4 py-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  <CircleUserRoundIcon className="h-8 w-8 stroke-current text-gray-400" />
                </AvatarFallback>
              </Avatar>

              <span className="text-sm leading-6 font-semibold">
                Administrator
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <LogoutItem />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default Navbar;

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
