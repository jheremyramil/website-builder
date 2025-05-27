import React from "react";
import { CircleXIcon } from "lucide-react";
import { useEditorStore } from "@/store";

const Blocks = () => {
  const isBlocksVisible = useEditorStore((state) => state.isBlocksVisible);
  const toggleBlocks = useEditorStore((state) => state.toggleBlocks);
  const editor = useEditorStore((state) => state.editor);

  return (
    <>
      {/* Overlay for mobile screens */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ease-in-out md:hidden ${
          isBlocksVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Sidebar */}
      <aside
        className={`h-screen bg-[#444] border-r border-[#444] transition-all duration-300 ease-in-out md:relative ${
          isBlocksVisible
            ? "translate-x-0 opacity-100 pointer-events-auto md:w-60" // When visible, set width
            : "-translate-x-full opacity-0 pointer-events-none md:w-0 md:overflow-hidden" // When hidden, set width to 0 and hide overflow
        }`}
      >
        {/* Close Button (Mobile only) */}
        <button
          className="absolute top-4 right-4 md:hidden p-2"
          onClick={toggleBlocks}
          aria-label="Close blocks panel"
        >
          <CircleXIcon className="h-6 w-6 stroke-current text-gray-600" />
        </button>

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
