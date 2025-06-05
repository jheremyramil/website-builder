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
import { getPagesByUserId } from "@/services/PageService";
import { verifySession } from "@/lib";
import UserAvatar from "../Avatar/UserAvatar";
import { CircleUserRoundIcon, House, LogOutIcon } from "lucide-react";
import { profile } from "@/services/ProfileService";
import { useRouter } from "next/navigation";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [userId, setUserId] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userName, setUserName] = useState("Loading...");
  const router = useRouter();

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
      const data = await getPagesByUserId(userId, currentPage);
      if (data?.pages?.data) {
        setPages(data.pages.data);
      }
    };

    fetchPages();
  }, [userId, currentPage]);

  const handleSubmit = async () => {
    try {
      const data = editor?.getProjectData();
      if (data) {
        const response = await editor?.StorageManager.store(data);

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
          description: "Content updated successfully!",
        });
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

    const html = editor?.getHtml();
    const styles = editor?.getCss();

    const previewWindow = window.open("", "_blank");

    if (previewWindow) {
      previewWindow.document.open();
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Preview</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Amatic+SC:wght@400;700&family=Anton&family=Architects+Daughter&family=Arimo:ital,wght@0,400..700;1,400..700&family=Arvo:ital,wght@0,400;0,700;1,400;1,700&family=Bangers&family=Bebas+Neue&family=Belleza&family=Bitter:ital,wght@0,100..900;1,100..900&family=Bree+Serif&family=Cabin:ital,wght@0,400..700;1,400..700&family=Candal&family=Cedarville+Cursive&family=Cousine:ital,wght@0,400;0,700;1,400;1,700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Dancing+Script:wght@400..700&family=Dosis:wght@200..800&family=Exo+2:ital,wght@0,100..900;1,100..900&family=Exo:ital,wght@0,100..900;1,100..900&family=Fira+Mono:wght@400;500;700&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Gochi+Hand&family=Great+Vibes&family=Inconsolata:wght@200..900&family=Indie+Flower&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Josefin+Slab:ital,wght@0,100..700;1,100..700&family=Judson:ital,wght@0,400;0,700;1,400&family=Karla:ital,wght@0,200..800;1,200..800&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lobster&family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&family=Lora:ital,wght@0,400..700;1,400..700&family=Maven+Pro:wght@400..900&family=Merriweather+Sans:ital,wght@0,300..800;1,300..800&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Orbitron:wght@400..900&family=Overpass:ital,wght@0,100..900;1,100..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Pacifico&family=Permanent+Marker&family=Play:wght@400;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&family=Quattrocento:wght@400;700&family=Quicksand:wght@300..700&family=Raleway+Dots&family=Raleway:ital,wght@0,100..900;1,100..900&family=Righteous&family=Roboto:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&family=Saira:ital,wght@0,100..900;1,100..900&family=Satisfy&family=Shadows+Into+Light&family=Signika:wght@300..700&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=Tangerine:wght@400;700&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=UnifrakturMaguntia&family=Varela+Round&family=Vollkorn:ital,wght@0,400..900;1,400..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&family=Yanone+Kaffeesatz:wght@200..700&family=Zilla+Slab+Highlight:wght@400;700&family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
          <style>${styles}</style>
          <style>
            .carousel-control-prev,
            .carousel-control-next {
                height: 60px;
                top: 50%;
                transform: translateY(-50%);
                width: 60px;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, 0.5);
                opacity: 1;
            }

            .carousel-control-prev-icon,
            .carousel-control-next-icon {
                width: 20px;
                height: 20px;
                filter: invert(1) grayscale(100%) brightness(200%); 
            }
          </style>
        </head>
        <body>
          ${html}
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
      `);
      previewWindow.document.close();
    } else {
      console.error("Failed to open new tab.");
    }
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
                onChange={(e) => {
                  const selectedId = e.target.value;
                  console.log("Selected page ID:", selectedId);
                }}
              >
                {pages.map((page) => (
                  <option key={page.id} value={page.id}>
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
                  className="rounded-xl border border-gray-200 bg-gray-100 px-3 py-1.5 text-sm text-gray-800 max-w-[120px] sm:max-w-none truncate"
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    console.log("Selected page ID:", selectedId);
                  }}
                >
                  {pages.map((page) => (
                    <option key={page.id} value={page.id}>
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
