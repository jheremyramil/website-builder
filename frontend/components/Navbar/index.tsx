"use client";

import {
  ChevronDownIcon,
  CircleArrowLeftIcon,
  CircleUserRoundIcon,
  EyeIcon,
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

const Navbar = () => {
  const { toast } = useToast();
  const { editor } = useEditorStore();
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userId, setUserId] = useState<number | null>(null);

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
      console.log("Fetching pages for userId:", userId, "page:", currentPage);
      const data = await getPagesByUserId(userId, currentPage);
      console.log("Fetched data:", data);
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
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Amatic+SC:wght@400;700&family=Anton&family=Architects+Daughter&family=Arimo:ital,wght@0,400..700;1,400..700&family=Arvo:ital,wght@0,400;0,700;1,400;1,700&family=Bangers&family=Bebas+Neue&family=Belleza&family=Bitter:ital,wght@0,100..900;1,100..900&family=Bree+Serif&family=Cabin:ital,wght@0,400..700;1,400..700&family=Candal&family=Cedarville+Cursive&family=Cousine:ital,wght@0,400;0,700;1,400;1,700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Dancing+Script:wght@400..700&family=Dosis:wght@200..800;1,200..800&family=Exo+2:ital,wght@0,100..900;1,100..900&family=Exo:ital,wght@0,100..900;1,100..900&family=Fira+Mono:wght@400;500;700&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Gochi+Hand&family=Great+Vibes&family=Inconsolata:wght@200..900&family=Indie+Flower&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Josefin+Slab:ital,wght@0,100..700;1,100..700&family=Judson:ital,wght@0,400;0,700;1,400&family=Karla:ital,wght@0,200..800;1,200..800&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lobster&family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&family=Lora:ital,wght@0,400..700;1,400..700&family=Maven+Pro:wght@400..900&family=Merriweather+Sans:ital,wght@0,300..800;1,300..800&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Orbitron:wght@400..900;1,400..900&family=Overpass:ital,wght@0,100..900;1,100..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Pacifico&family=Permanent+Marker&family=Play:wght@400;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&family=Quattrocento:wght@400;700&family=Quicksand:wght@300..700&family=Raleway+Dots&family=Raleway:ital,wght@0,100..900;1,100..900&family=Righteous&family=Roboto:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&family=Saira:ital,wght@0,100..900;1,100..900&family=Satisfy&family=Shadows+Into+Light&family=Signika:wght@300..700&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=Tangerine:wght@400;700&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=UnifrakturMaguntia&family=Varela+Round&family=Vollkorn:ital,wght@0,400..900;1,400..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&family=Yanone+Kaffeesatz:wght@200..700&family=Zilla+Slab+Highlight:wght@400;700&family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
          </head>
                     <style>
                ${styles} 


                .carousel-control-prev,
                .carousel-control-next {
                    height: 60px; /* Desired height */
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
      <header className="h-18 bg-white flex justify-between px-8 items-center border-b border-gray-200 gap-x-6">
        <div className="flex items-center justify-center gap-x-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center rounded-xl p-2"
          >
            <CircleArrowLeftIcon className="h-6 w-6 stroke-current text-gray-400" />
          </Link>

          {/* Show page details  */}
          {pages.length > 0 && (
            <select
              className="rounded-xl border border-gray-200 bg-gray-100 px-6 py-2 text-sm text-gray-800"
              onChange={(e) => {
                const selectedId = e.target.value;
                console.log("Selected page ID:", selectedId);
                // Optional: do something with the selected page ID
              }}
            >
              {pages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.name}
                </option>
              ))}
            </select>
          )}

          {/* Preview Website  */}
          <button
            onClick={handlePreviewPage}
            className="flex items-center justify-center gap-x-2 rounded-xl bg-gray-100 px-4 py-2"
          >
            <EyeIcon className="h-5 w-5 stroke-current text-gray-400" />
            <span className="text-sm font-semibold leading-6">Preview</span>
          </button>
        </div>

        <div className="flex gap-x-3">
          {/* Panel Devices  */}

          <Devices />
          <Tools />
        </div>

        <div className="flex gap-x-3 items-center">
          <div className="flex h-18 items-center gap-x-4 border-b border-gray-200 px-6">
            <Button
              onClick={handleSubmit}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Save
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-green-400 text-gray-200 hover:bg-green-600 hover:text-white transition duration-300"
            >
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
