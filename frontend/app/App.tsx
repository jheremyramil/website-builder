import Link from "next/link";
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
import { CircleUserRoundIcon } from "lucide-react";
import { fetchAllTemplates } from "@/services";
import TemplateList from "@/components/TemplateList";

export const Dashboard = async () => {
  const templates = await fetchAllTemplates();

  return (
    <>
      <div className="h-screen flex flex-col bg-gray-100 font-sans text-gray-900">
        <div className="flex h-screen flex-1 flex-col">
          <header className="h-18 bg-white flex justify-end px-8 items-center border-b border-gray-200 gap-x-6">
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
          </header>

          <main className="p-8 space-y-6">
            <header className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Templates</h1>
              <Link href="/editor">
                <Button>Create New Template</Button>
              </Link>
            </header>

            <section>
              <TemplateList templates={templates} />
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
