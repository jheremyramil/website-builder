"use client";

import { useEditorStore } from "@/store";
import initGrapesJSEditor from "@/types/EditorConfig";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Blocks = dynamic(() => import("@/components/Blocks"), { ssr: false });
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const RightSidebar = dynamic(() => import("@/components/RightSidebar"), {
  ssr: false,
});

const PageDetail = () => {
  const params = useParams();
  const rawPageId = params?.pageId;
  const pageId = Array.isArray(rawPageId) ? rawPageId[0] : rawPageId;

  const { setEditor, setTemplateId, assets, editorRef } = useEditorStore();

  useEffect(() => {
    if (!pageId) return;

    let raf: number;
    let cleanupEditor: any;

    const waitForRef = () => {
      if (!editorRef.current) {
        raf = requestAnimationFrame(waitForRef);
        return;
      }

      const editor = initGrapesJSEditor(
        editorRef.current,
        pageId,
        assets,
        pageId
      );

      setEditor(editor);
      cleanupEditor = editor;
    };

    waitForRef();

    return () => {
      cancelAnimationFrame(raf);
      if (cleanupEditor && typeof cleanupEditor.destroy === "function") {
        cleanupEditor.destroy();
      }
    };
  }, [pageId, assets, setEditor]);

  return (
    <div className="flex flex-col bg-gray-100 font-sans text-gray-900 overflow-x-hidden">
      <Navbar />
      <div className="flex overflow-hidden">
        <Blocks />
        <main className="flex-1 p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <Editor />
        </main>
        <RightSidebar />
      </div>
    </div>
  );
};

export default PageDetail;
