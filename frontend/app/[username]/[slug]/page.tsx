"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import grapesjs from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import gjsPluginExport from "grapesjs-plugin-export";
import gjsPresetNavbar from "grapesjs-navbar";
import gjsPresetForms from "grapesjs-plugin-forms";
import gjsPresetTooltip from "grapesjs-tooltip";
import { getPageByUserIdAndSlug } from "@/services";
import { Loader2, AlertTriangle, ArrowLeft } from "lucide-react";

const PublicPage = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { username, slug } = useParams();
  const router = useRouter();
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setStatus("loading");
        const page = await getPageByUserIdAndSlug(username, slug);

        if (!page?.id) {
          throw new Error("Page not found");
        }

        const contentRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/page/${page.id}/content`
        );

        const { pages, styles } = contentRes.data;

        const editor = grapesjs.init({
          container: document.createElement("div"),
          fromElement: false,
          height: "0px",
          width: "0px",
          storageManager: false,
          plugins: [
            gjsBlockBasic,
            gjsPluginExport,
            gjsPresetNavbar,
            gjsPresetForms,
            gjsPresetTooltip,
          ],
          pluginsOpts: {
            gjsBlockBasic: {},
            gjsPluginExport: {},
            gjsPresetNavbar: {},
            gjsPresetForms: {},
            gjsPresetTooltip: {},
          },
        });

        await editor.loadProjectData({ pages, styles });

        setHtml(editor.getHtml());
        setCss(editor.getCss());
        setStatus("success");
        editor.destroy();
      } catch (err) {
        console.error("Failed to load page:", err);
        setStatus("error");
        setErrorMessage(
          err instanceof Error ? err.message : "Failed to load page"
        );
      }
    };

    if (username && slug) {
      fetchPage();
    }
  }, [username, slug]);

  useEffect(() => {
    if (!iframeRef.current || !html || status !== "success") return;

    const styles = `
      ${css}
      .carousel-control-prev, .carousel-control-next {
        height: 60px;
        top: 50%;
        transform: translateY(-50%);
        width: 60px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 1;
      }
      .carousel-control-prev-icon, .carousel-control-next-icon {
        width: 20px;
        height: 20px;
        filter: invert(1) grayscale(100%) brightness(200%);
      }
    `;

    const fullDoc = `
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
    <body>
      ${html}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    `;

    iframeRef.current.srcdoc = fullDoc;
  }, [html, css, status]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-800 dark:text-white">
            Loading your page
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This will just take a moment...
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className=" flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 px-4 mx-auto">
        <div className="  flex items-center justify-center flex-col w-[400px] h-[400px] text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {errorMessage ||
              "The page you're looking for doesn't exist or may have been removed."}
          </p>
          <button
            onClick={() => router.back()}
            className="text-sm mt-6 px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-lg font-medium transition-all flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        className="w-full h-screen border-0"
        title="Page View"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation-by-user-activation"
      />
    </div>
  );
};

export default PublicPage;
