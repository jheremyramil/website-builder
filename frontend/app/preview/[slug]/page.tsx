"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useEditorStore } from "@/store/editorStore";

const PreviewPage = () => {
  const { editor } = useEditorStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");

  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;

    const html = localStorage.getItem(`preview_html_${slug}`) || "";
    const css = localStorage.getItem(`preview_css_${slug}`) || "";
    setHtml(html);
    setCss(css);
  }, [slug]);

  useEffect(() => {
    if (!iframeRef.current || !html) return;

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
  }, [html, css]);

  return (
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        className="w-full h-screen border-0"
        title="Preview"
        sandbox="allow-same-origin allow-scripts allow-popups"
      />
    </div>
  );
};

export default PreviewPage;
