"use client";

import Blocks from "@/components/Blocks";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";

import Editor from "@/components/Editor";
import { EditorProvider } from "@/context/EditorContext";
import { fetchAllAssets } from "@/services";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PageDetail = () => {
  const { pageId } = useParams();
  const [assets, setAssets] = useState([]);
  const templateId = Array.isArray(pageId) ? pageId[0] : pageId;

  useEffect(() => {
    async function getAllAssets() {
      try {
        const response = await fetchAllAssets();
        const { assets } = response;

        setAssets(assets);
      } catch (error) {
        console.error("Error fetching assets", error);
      }
    }

    return () => {
      getAllAssets();
    };
  }, []);

  return (
    <EditorProvider templateId={templateId} assets={assets}>
      <div className="h-screen flex flex-col bg-gray-100 font-sans text-gray-900">
        <Navbar />

        <div className="flex overflow-hidden">
          {/* Blocks (Sidebar) on the left */}
          <Blocks />

          <main className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <Editor />
          </main>

          {/* Styles and Layer Manager */}
          <RightSidebar />
        </div>
      </div>
    </EditorProvider>
  );
};

export default PageDetail;
