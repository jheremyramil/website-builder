import { useEditorStore } from "@/store";
import {
  CodeIcon,
  MaximizeIcon,
  PanelLeftIcon,
  PanelRightIcon,
  Redo2Icon,
  SquareDashedIcon,
  TrashIcon,
  Undo2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import ImportCodeDialog from "../ImportCode";

const Tools = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { editor, toggleBlocks, toggleRightSidebarVisible } = useEditorStore();

  const toggleGridLines = () => {
    const canvas = editor?.Canvas.getBody();
    canvas?.classList.toggle("grid-lines");
  };

  const toggleMaximize = () => {
    const editorContainer = document.getElementById("editor");
    editorContainer?.classList.toggle("fullscreen");
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      const editorContainer = document.getElementById("editor");
      editorContainer?.classList.remove("fullscreen");
    }
  };

  const toggleImportCode = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const undoAction = () => {
    editor?.UndoManager.undo();
  };

  const redoAction = () => {
    editor?.UndoManager.redo();
  };

  const clearCanvas = () => {
    if (confirm("Are you sure you want to clear the canvas?")) {
      editor?.DomComponents.clear();
      editor?.CssComposer.clear();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
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

        {/* Toggle Left Sidebar (Blocks) */}
        <button
          onClick={toggleBlocks}
          className="rounded-xl p-2 text-gray-400 hover:bg-gray-100"
        >
          <PanelLeftIcon className="h-5 w-5 stroke-current" />
        </button>

        {/* Toggle Right Sidebar */}
        <button
          onClick={toggleRightSidebarVisible}
          className="rounded-xl p-2 text-gray-400 hover:bg-gray-100"
        >
          <PanelRightIcon className="h-5 w-5 stroke-current" />
        </button>
      </div>

      <ImportCodeDialog
        editor={editor}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default Tools;
