"use client";

import { useState, useEffect } from "react";
import { CircleXIcon } from "lucide-react";
import { useEditorStore } from "@/store";

const RightSidebar = () => {
  const [activeTab, setActiveTab] = useState("layers");
  const isVisible = useEditorStore((s) => s.isRightSidebarVisible);
  const toggleRightSidebar = useEditorStore((s) => s.toggleRightSidebarVisible);

  return (
    <>
      {/* Overlay on mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ease-in-out md:hidden  ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-screen bg-[#444] border-l border-[#444] z-50 transition-all duration-300 ease-in-out md:relative flex flex-col ${
          isVisible
            ? "translate-x-0 opacity-100 pointer-events-auto w-[300px]"
            : "translate-x-full opacity-0 pointer-events-none w-0"
        }`}
      >
        {/* Close (Mobile Only) */}
        <button
          className="absolute top-4 left-4 md:hidden p-2"
          onClick={toggleRightSidebar}
          aria-label="Close right sidebar"
        >
          <CircleXIcon className="h-6 w-6 stroke-current text-gray-300" />
        </button>

        {/* Tabs */}
        <div className="flex border-b border-[#444]">
          {["layers", "styles", "traits"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 p-2 text-white text-center ${
                activeTab === tab ? "bg-gray-700" : "bg-[#444]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <div
            id="layers-container"
            className={`text-black-900 ${activeTab === "layers" ? "block" : "hidden"}`}
          ></div>
          <div
            id="styles-container"
            className={`text-black-900 ${activeTab === "styles" ? "block" : "hidden"}`}
          ></div>
          <div
            id="traits-container"
            className={`text-black-900 ${activeTab === "traits" ? "block" : "hidden"}`}
          ></div>
        </div>
      </aside>
    </>
  );
};

export default RightSidebar;
