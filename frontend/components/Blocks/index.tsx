"use client";

import { CircleXIcon } from "lucide-react";
import { useState } from "react";

const Blocks = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleBlocks = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      {/* Overlay for mobile screens */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ease-in-out md:hidden ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleBlocks}
      ></div>

      {/* Sidebar */}
      <aside
        className={`h-screen w-full md:w-60 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out  md:relative   ${
          isVisible ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close Button (Mobile only) */}
        <button
          className="absolute top-4 right-4 md:hidden p-2"
          onClick={toggleBlocks}
        >
          <CircleXIcon className="h-6 w-6 stroke-current text-gray-600" />
        </button>

        {/* Content */}
        <div
          id="blocks"
          className="h-[93vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        >
          {/* GrapesJS blocks will be dynamically appended here */}
        </div>
      </aside>
    </>
  );
};

export default Blocks;
