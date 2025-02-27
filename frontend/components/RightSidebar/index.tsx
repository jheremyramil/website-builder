"use client";

import { useState } from "react";

const RightSidebar = () => {
  const [activeTab, setActiveTab] = useState("layers");

  return (
    <aside className="flex flex-col h-screen w-[300px] bg-[#444] border-l border-[#444]">
      {/* Tabs for Switching */}
      <div className="flex border-b border-[#444]">
        <button
          onClick={() => setActiveTab("layers")}
          className={`flex-1 p-2 text-white text-center ${
            activeTab === "layers" ? "bg-gray-700" : "bg-[#444]"
          }`}
        >
          Layers
        </button>
        <button
          onClick={() => setActiveTab("styles")}
          className={`flex-1 p-2 text-white text-center ${
            activeTab === "styles" ? "bg-gray-700" : "bg-[#444]"
          }`}
        >
          Styles
        </button>
        <button
          onClick={() => setActiveTab("traits")}
          className={`flex-1 p-2 text-white text-center ${
            activeTab === "traits" ? "bg-gray-700" : "bg-[#444]"
          }`}
        >
          Traits
        </button>
      </div>

      {/* Content Containers (Kept in DOM) */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
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
  );
};

export default RightSidebar;
