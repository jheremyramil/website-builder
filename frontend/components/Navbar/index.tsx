"use client";

import {
  ChevronDownIcon,
  CircleArrowLeftIcon,
  EyeIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";

import { logoutAction } from "@/actions";
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
import { useToast } from "@/hooks";
import { useEditorStore } from "@/store";
import Link from "next/link";
import Devices from "./Devices";
import Tools from "./Tools";
import { useState, useEffect } from "react";
import { getAllPagesByUserId, getPageBySlug } from "@/services/PageService";
import { verifySession } from "@/lib";
import UserAvatar from "../Avatar/UserAvatar";
import { CircleUserRoundIcon, House, LogOutIcon } from "lucide-react";
import { profile } from "@/services/ProfileService";
import { useRouter } from "next/navigation";
import { slugify } from "@/utils/slugify";
import { useParams } from "next/navigation";
import { Slot } from "@radix-ui/react-slot";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

const Navbar = () => {
  const { toast } = useToast();
  const { editor } = useEditorStore();
  const [pages, setPages] = useState([]);

  const [userId, setUserId] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userName, setUserName] = useState("Loading...");
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const params = useParams();
  const rawPageId = params?.pageId;
  const pageId = Array.isArray(rawPageId) ? rawPageId[0] : rawPageId;
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await profile();
        setUser(data);
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

  useEffect(() => {
    const fetchSession = async () => {
      const session = await verifySession();
      if (session?.userId) {
        setUserId(session.userId);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchPages = async () => {
      const data = await getAllPagesByUserId(userId);

      if (data?.pages) {
        setPages(data.pages);

        const matchedPage = data.pages.find(
          (p: any) => String(p.id) === String(pageId)
        );
        setSelectedPage(matchedPage || data.pages[0]);
      }
    };

    fetchPages();
  }, [userId, pageId]);

  // useEffect(() => {
  //   console.log("userId:", userId);
  //   console.log("pageId from params:", pageId);
  //   console.log("selectedPage:", selectedPage);
  // }, [userId, pageId, selectedPage]);

  const handleSubmit = async () => {
    try {
      const data = editor?.getProjectData();
      const html = editor?.getHtml();
      const css = editor?.getCss();

      if (data && html && css) {
        // Store to backend
        const response = await editor?.StorageManager.store(data);

        const slugName = slugify(selectedPage.name || "untitled-page");

        localStorage.setItem(`preview_html_${slugName}`, html);
        localStorage.setItem(`preview_css_${slugName}`, css);
        localStorage.setItem(
          `preview_project_data_${slugName}`,
          JSON.stringify(data)
        );

        if (!response) {
          toast({
            title: "Error!",
            variant: "destructive",
            description: "Failed to update content.",
          });
        }

        toast({
          title: "Success!",
          variant: "success",
          description: "Content saved and preview ready!",
        });

        // Open preview after saving
        handlePreviewPage();
      }
    } catch (error: any) {
      toast({
        title: "Something went wrong!",
        variant: "destructive",
        description:
          error?.message ||
          "An unexpected error occurred. Please contact system administrator",
      });
    }
  };

  const handlePreviewPage = () => {
    if (!editor) return;

    const html = editor.getHtml();
    const styles = editor.getCss();
    const data = editor.getProjectData();

    const dbName = selectedPage?.name || "untitled-page";
    const slug = slugify(dbName);

    localStorage.setItem(`preview_html_${slug}`, html);
    localStorage.setItem(`preview_css_${slug}`, styles);
    localStorage.setItem(`preview_project_data_${slug}`, JSON.stringify(data));

    window.open(`/preview/${slug}`, "_blank");
  };

  return (
    <div className="flex h-screen flex-1 flex-col">
      <header className="w-full bg-white border-b border-gray-200 px-4 py-3">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center justify-center rounded-xl p-2 hover:bg-gray-100"
            >
              <CircleArrowLeftIcon className="h-6 w-6 stroke-current text-gray-400" />
            </Link>

            {pages.length > 0 && (
              <select
                className="rounded-xl border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-gray-800"
                value={selectedPage?.id?.toString() || ""}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  router.push(`/editor/${selectedId}`);
                }}
              >
                {pages.map((page) => (
                  <option key={page.id} value={page.id.toString()}>
                    {page.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Middle Section */}
          <div className="flex items-center gap-4">
            <Devices />
            <Tools />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handlePreviewPage}
              variant="ghost"
              className="flex items-center gap-x-2"
            >
              <EyeIcon className="h-5 w-5 stroke-current text-gray-400" />
              <span className="text-sm font-semibold leading-6">Preview</span>
            </Button>

            <Button
              onClick={handleSubmit}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 text-sm"
            >
              Save
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-green-400 text-gray-200 hover:bg-green-600 hover:text-white transition duration-300 text-sm"
            >
              Save & Publish
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center gap-x-2 rounded-xl bg-gray-100 px-4 py-2 hover:bg-gray-200 transition-colors">
                {user ? (
                  <>
                    <UserAvatar userId={user.id} size="sm" />
                    <span className="text-sm leading-6 font-semibold">
                      {userName}
                    </span>
                  </>
                ) : (
                  <span className="text-sm leading-6 font-semibold">
                    Loading...
                  </span>
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
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Top Row */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center justify-center rounded-xl p-2 hover:bg-gray-100"
              >
                <CircleArrowLeftIcon className="h-6 w-6 stroke-current text-gray-400" />
              </Link>

              {pages.length > 0 && (
                <select
                  className="rounded-xl border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-gray-800"
                  value={selectedPage?.id?.toString() || ""}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    router.push(`/editor/${selectedId}`);
                  }}
                >
                  {pages.map((page) => (
                    <option key={page.id} value={page.id.toString()}>
                      {page.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={handlePreviewPage}
                variant="ghost"
                size="sm"
                className="p-2 hidden sm:inline-flex"
              >
                <EyeIcon className="h-5 w-5 stroke-current text-gray-400" />
              </Button>

              <button
                className="p-2 text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <XIcon className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="flex flex-col mt-4 space-y-4 lg:hidden">
              <div className="flex flex-col gap-3 p-2 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-500">Devices</h3>
                  <Devices />
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-500">Tools</h3>
                  <Tools />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={handlePreviewPage}
                  variant="ghost"
                  className="flex items-center justify-start gap-x-2 text-left"
                >
                  <EyeIcon className="h-5 w-5 stroke-current text-gray-400" />
                  <span>Preview</span>
                </Button>

                <Button
                  onClick={handleSubmit}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 text-sm"
                >
                  Save
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-green-400 text-gray-200 hover:bg-green-600 hover:text-white transition duration-300 text-sm"
                >
                  Save & Publish
                </Button>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center justify-start gap-x-2 rounded-xl w-full px-4 py-2 hover:bg-gray-100 transition-colors text-left">
                    {user ? (
                      <>
                        <UserAvatar userId={user.id} size="sm" />
                        <span className="text-sm leading-6 font-semibold">
                          {userName}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm leading-6 font-semibold">
                        Loading...
                      </span>
                    )}
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-full" align="end">
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
              </div>
            </div>
          )}
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

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOutIcon className="mr-2 h-4 w-4" />
      Logout
    </DropdownMenuItem>
  );
};
