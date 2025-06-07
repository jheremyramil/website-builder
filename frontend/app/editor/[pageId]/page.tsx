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
  const { pageId } = useParams();
  const { setEditor, setTemplateId, assets, templateId, editorRef } =
    useEditorStore();

  useEffect(() => {
    const id = Array.isArray(pageId) ? pageId[0] : pageId;
    if (!id) return;
    setTemplateId(id);
  }, [pageId, setTemplateId]);

  useEffect(() => {
    if (!editorRef.current || !templateId) return;

    const editor = initGrapesJSEditor(editorRef.current, templateId, assets);
    setEditor(editor);

    return () => editor.destroy();
  }, [templateId, assets, setEditor]);

  return (
    <div className=" flex flex-col bg-gray-100 font-sans text-gray-900 overflow-x-hidden">
      <Navbar />

      <div className="flex overflow-hidden">
        {/* Blocks (Sidebar) on the left */}
        <Blocks />

        <main className=" flex-1 p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <Editor />
        </main>

        {/* Styles and Layer Manager */}
        <RightSidebar />
      </div>
    </div>
  );
};

export default PageDetail;
