import {
  ChevronDownIcon,
  CircleUserRoundIcon,
  EyeIcon,
  MenuIcon,
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
import Tools from "./Tools";
import Devices from "./Devices";

interface NavbarProps {
  toggleSidebar?: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <div className="flex h-screen flex-1 flex-col">
      <header className="h-18 bg-white flex justify-between px-8 items-center border-b border-gray-200 gap-x-6">
        <div className="flex items-center justify-center gap-x-3">
          <button
            className="flex items-center justify-center rounded-xl bg-gray-100 p-2"
            onClick={toggleSidebar}
          >
            <MenuIcon className="h-6 w-6 stroke-current text-gray-400" />
          </button>

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
          <Devices />

          {/* Tools  */}
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
            <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
