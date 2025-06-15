"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import grapesjs from "grapesjs";
import { getPageBySlug } from "@/services/PageService";

export default function ClientPreview() {
  const { slug } = useParams();
  const editorRef = useRef<any>(null);
  const [html, setHtml] = useState<string>("");
  const [css, setCss] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const initializeEditorWithData = async (data: any) => {
    const container = document.createElement("div");
    const fragment = document.createDocumentFragment();
    fragment.appendChild(container);

    const editor = grapesjs.init({
      container,
      height: "0px",
      storageManager: false,
    });

    editorRef.current = editor;

    try {
      await editor.loadProjectData({
        pages: data.pages || [],
        styles: data.styles || [],
        assets: data.assets || [],
        symbols: data.symbols || [],
      });

      const html = editor.getHtml();
      const css = editor.getCss();

      setHtml(html);
      setCss(css);
    } catch (err) {
      console.error("Error loading project data:", err);
    } finally {
      setIsLoading(false);
      editor.destroy();
    }
  };

  const initializeEditorWithDefaultData = async () => {
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

    await initializeEditorWithData(defaultData);
  };

  useEffect(() => {
    if (!slug || Array.isArray(slug)) return;

    const fetchAndInit = async () => {
      const data = await getPageBySlug(slug);
      if (!data || !data.pages || data.pages.length === 0) {
        console.warn("No page data available, using default.");
        await initializeEditorWithDefaultData();
        return;
      }

      await initializeEditorWithData(data);
    };

    fetchAndInit();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="relative w-20 h-20 mb-4">
          <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

          <div className="absolute inset-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700">Loading Preview</h2>
        <p className="text-gray-500 mt-2">
          Please wait while we prepare your content
        </p>
      </div>
    );
  }

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
