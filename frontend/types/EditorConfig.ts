"use client";

import {
  addEditorCommand,
  getYouTubeEmbedUrl,
  layerManager,
  panels,
  selectorManager,
  traitManager,
} from "@/lib";
import axios from "axios";
import grapesjs, { ProjectData } from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import gjsPresetNavbar from "grapesjs-navbar";
import gjsPluginExport from "grapesjs-plugin-export";
import gjsPresetForms from "grapesjs-plugin-forms";
import gjsStyleBG from "grapesjs-style-bg";
import gjsPresetTooltip from "grapesjs-tooltip";
import "grapesjs/dist/css/grapes.min.css";
import { fontOptions } from "@/utils/fonts";
import registerCustomCarousel from "@/components/features/carouselBlock";
import { registerYouTubeVideoComponent } from "@/components/features/YouTubeVideo";

const isBrowser = typeof window !== "undefined";

const API_BASE_URL = isBrowser
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : process.env.INTERNAL_API_BASE_URL;

const initGrapesJSEditor = (
  container: HTMLElement,
  templateId: string,
  assets: (string | Record<string, any>)[]
) => {
  const editor = grapesjs.init({
    container,
    blockManager: {
      appendTo: "#blocks",
    },

    styleManager: {
      appendTo: "#styles-container",
    },
    canvas: {
      styles: [
        "https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Amatic+SC:wght@400;700&family=Anton&family=Architects+Daughter&family=Arimo:ital,wght@0,400..700;1,400..700&family=Arvo:ital,wght@0,400;0,700;1,400;1,700&family=Bangers&family=Bebas+Neue&family=Belleza&family=Bitter:ital,wght@0,100..900;1,100..900&family=Bree+Serif&family=Cabin:ital,wght@0,400..700;1,400..700&family=Candal&family=Cedarville+Cursive&family=Cousine:ital,wght@0,400;0,700;1,400;1,700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Dancing+Script:wght@400..700&family=Dosis:wght@200..800&family=Exo+2:ital,wght@0,100..900;1,100..900&family=Exo:ital,wght@0,100..900;1,100..900&family=Fira+Mono:wght@400;500;700&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Gochi+Hand&family=Great+Vibes&family=Inconsolata:wght@200..900&family=Indie+Flower&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Josefin+Slab:ital,wght@0,100..700;1,100..700&family=Judson:ital,wght@0,400;0,700;1,400&family=Karla:ital,wght@0,200..800;1,200..800&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lobster&family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&family=Lora:ital,wght@0,400..700;1,400..700&family=Maven+Pro:wght@400..900&family=Merriweather+Sans:ital,wght@0,300..800;1,300..800&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Orbitron:wght@400..900&family=Overpass:ital,wght@0,100..900;1,100..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Pacifico&family=Permanent+Marker&family=Play:wght@400;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&family=Quattrocento:wght@400;700&family=Quicksand:wght@300..700&family=Raleway+Dots&family=Raleway:ital,wght@0,100..900;1,100..900&family=Righteous&family=Roboto:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&family=Saira:ital,wght@0,100..900;1,100..900&family=Satisfy&family=Shadows+Into+Light&family=Signika:wght@300..700&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=Tangerine:wght@400;700&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=UnifrakturMaguntia&family=Varela+Round&family=Vollkorn:ital,wght@0,400..900;1,400..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&family=Yanone+Kaffeesatz:wght@200..700&family=Zilla+Slab+Highlight:wght@400;700&family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
      ],
      scripts: [
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
      ],
    },
    layerManager,
    selectorManager,
    traitManager,
    panels,
    assetManager: {
      uploadName: "file",
      assets: [],
      headers: {
        "X-CSRF-TOKEN": document
          .querySelector('meta[name="csrf-token"]')
          ?.getAttribute("content"),
      },
      uploadFile: async function (e) {
        const files = e.dataTransfer
          ? e.dataTransfer.files
          : (e.target as HTMLInputElement)?.files;
        const formData = new FormData();

        if (files && files.length > 0) {
          if (files.length === 1) {
            formData.append("file", files[0]);
          } else {
            Array.from(files).forEach((file) => {
              formData.append("files[]", file);
            });
          }
        } else {
          const youtubeUrl = (e.target as HTMLInputElement)?.value?.trim();

          const embedUrl = getYouTubeEmbedUrl(youtubeUrl);

          if (embedUrl) {
            const selectedComponent = editor.getSelected();
            if (selectedComponent) {
              selectedComponent.parent().append(
                {
                  type: "youtube-video",
                  traits: [{ name: "youtubeUrl", value: youtubeUrl }],
                },
                { at: selectedComponent.index() + 1 }
              );
            } else {
              editor.addComponents({
                type: "youtube-video",
                traits: [{ name: "youtubeUrl", value: youtubeUrl }],
              });
            }

            editor.AssetManager.render();
            return;
          }

          console.error("Invalid file or URL for upload.");
        }

        try {
          const response = await axios.post(
            `${API_BASE_URL}/assets`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (!response || !response.data.data) {
            console.error("Upload failed:", response);
            return;
          }

          const { url, urls } = response.data.data;

          if (url) {
            // Single file upload
            const am = editor.AssetManager;
            am.add({ src: url });
            am.render();
            const selectedComponent = editor.getSelected();
            if (selectedComponent && selectedComponent.is("image")) {
              selectedComponent.set("src", url);
            }
          } else if (urls && Array.isArray(urls)) {
            // Multiple file uploads
            const am = editor.AssetManager;
            urls.forEach((fileUrl) => {
              am.add({ src: fileUrl });
            });
            am.render();
          } else {
            console.error("Unexpected response format:", response);
          }
        } catch (error) {
          console.error("Upload error:", error);
        }
      },
    },

    storageManager: {
      type: "remote",
      stepsBeforeSave: 3,
      options: {
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
        remote: {
          contentTypeJson: true,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      },
    },
    width: "100%",
    height: "100vh",
    plugins: [
      gjsBlockBasic,
      gjsPluginExport,
      //gjsStyleBG,
      gjsPresetNavbar,
      gjsPresetForms,
      gjsPresetTooltip,
    ],
    pluginsOpts: {
      gjsBlockBasic: {},
      gjsPluginExport: {},
      //gjsStyleBG: {},
      gjsPresetNavbar: {},
      gjsPresetForms: {},
      gjsPresetTooltip: {},
    },
  });

  editor.on("load", () => {
    const fontProperty = editor.StyleManager.getProperty(
      "typography",
      "font-family"
    );

    if (fontProperty) {
      const options = fontProperty.get("options") || [];
      options.push(...fontOptions);
      fontProperty.set("options", options);
      editor.StyleManager.render();
    }
  });

  editor.on("component:selected", (component) => {
    if (component.is("link")) {
      const href = component.getAttributes().href;
      if (href) {
        window.open(href, "_blank");
      }
    }
  });

  registerCustomCarousel(editor);
  registerYouTubeVideoComponent(editor);
  addEditorCommand(editor);

  if (assets) {
    editor.AssetManager.add(assets);
  }

  editor.Storage.add("remote", {
    async load(): Promise<ProjectData> {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/page/${templateId}/content`
        );

        const { pages, styles, assets } = response.data;

        if (!pages) {
          return initializeEditorWithDefaultData();
        }

        const projectData = { pages, styles, assets };
        editor.loadProjectData({ pages, styles, assets });

        return projectData;
      } catch (error: any) {
        console.error(error?.message || "An unexpected error occurred.");
        return initializeEditorWithDefaultData();
      }
    },

    async store(data) {
      const response = await axios.post(
        `${API_BASE_URL}/page/${templateId}/content`,
        data
      );

      const { content } = response.data;
      return content;
    },
  });

  function initializeEditorWithDefaultData() {
    const defaultData = {
      pages: [
        {
          component: `<div class="test">Hello World!</div>`,
          styles: [
            {
              selectors: [".test"],
              style: {
                color: "#444",
                "font-size": "2rem",
                "font-weight": "500",
              },
            },
          ],
        },
      ],
    };

    const { component, styles } = defaultData.pages[0];
    editor.setComponents(component);
    editor.setStyle(styles);

    return defaultData;
  }

  editor.on("component:selected", (component) => {
    const selection = window.getSelection();
    const isTextSelected = selection && selection.toString().trim().length > 0;

    if (!isTextSelected) return;

    const style = component.getStyle();

    if (style["font-family"]) {
      console.log("Clearing locked font family:", style["font-family"]);
      delete style["font-family"];
      component.setStyle(style);
    }

    if (style["color"]) {
      console.log("Clearing locked color:", style["color"]);
      delete style["color"];
      component.setStyle(style);
    }
  });

  editor.on("style:property:update", ({ property, value }) => {
    const name = property.get("property");
  });

  return editor;
};

export default initGrapesJSEditor;
