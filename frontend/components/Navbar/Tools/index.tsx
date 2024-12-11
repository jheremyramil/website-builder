import { useEditorStore } from "@/store";
import {
  CodeIcon,
  MaximizeIcon,
  Redo2Icon,
  SquareDashedIcon,
  TrashIcon,
  Undo2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import ImportCodeDialog from "../ImportCode";

const Tools = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { editor } = useEditorStore();

  // Toggle grid lines
  const toggleGridLines = () => {
    const canvas = editor?.Canvas.getBody();
    console.log(canvas, "canvas");
    canvas?.classList.toggle("grid-lines");
  };

  // Maximize editor
  const toggleMaximize = () => {
    const editorContainer = document.getElementById("editor");
    editorContainer?.classList.toggle("fullscreen");
  };

  // Handle the `Esc` key press to minimize the fullscreen mode
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      const editorContainer = document.getElementById("editor");
      editorContainer?.classList.remove("fullscreen");
    }
  };

  // Import code
  const toggleImportCode = () => {
    setIsDialogOpen((prev) => !prev);
  };

  // Undo action
  const undoAction = () => {
    editor?.UndoManager.undo();
  };

  // Redo action
  const redoAction = () => {
    editor?.UndoManager.redo();
  };

  // Delete canvas
  const clearCanvas = () => {
    if (confirm("Are you sure you want to clear the canvas?")) {
      editor?.DomComponents.clear();
    }
  };

  useEffect(() => {
    // Add event listener on mount
    document.addEventListener("keydown", handleEscapeKey);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <>
      <div className="flex items-center gap-x-1">
        <button
          className="rounded-xl p-2 text-gray-400 hover:bg-gray-100"
          onClick={toggleGridLines}
        >
          <SquareDashedIcon className="h-5 w-5 stroke-current" />
        </button>

        <button
          className="rounded-xl p-2 text-gray-400 hover:bg-gray-100"
          onClick={toggleMaximize}
        >
          <MaximizeIcon className="h-5 w-5 stroke-current" />
        </button>

        <button
          className="rounded-xl p-2 text-gray-400 hover:bg-gray-100"
          onClick={toggleImportCode}
        >
          <CodeIcon className="h-5 w-5 stroke-current" />
        </button>

        <button
          className="rounded-xl p-2 text-gray-400 hover:bg-gray-100"
          onClick={undoAction}
        >
          <Undo2Icon className="h-5 w-5 stroke-current" />
        </button>

        <button
          className="rounded-xl p-2 text-gray-400 hover:bg-gray-100"
          onClick={redoAction}
        >
          <Redo2Icon className="h-5 w-5 stroke-current" />
        </button>

        <button
          className="rounded-xl p-2 text-gray-400 hover:bg-gray-100"
          onClick={clearCanvas}
        >
          <TrashIcon className="h-5 w-5 stroke-current" />
        </button>
      </div>

      {/* ImportCodeDialog */}
      <ImportCodeDialog
        editor={editor}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default Tools;
