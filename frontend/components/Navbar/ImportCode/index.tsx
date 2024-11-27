import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui";
import { Editor } from "grapesjs";
import { useEffect, useRef, useState } from "react";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { useCodeMirrorEditor } from "@/hooks";

interface ImportCodeDialogProps {
  editor: Editor | null;
  isOpen: boolean;
  onClose: () => void;
}

const languageExtensions = [javascript(), html(), css()];

const ImportCodeDialog = ({
  editor,
  isOpen,
  onClose,
}: ImportCodeDialogProps) => {
  const [htmlCode, setHtmlCode] = useState("");
  const editorRef = useRef(null);

  const { handleEditorChange } = useCodeMirrorEditor(
    htmlCode,
    editor,
    editorRef
  );

  // Syncing the code editor with the canvas content when opened
  useEffect(() => {
    if (isOpen && editor) {
      const htmlContent = editor.getHtml();
      const cssContent = editor.getCss();
      const fullCode = htmlContent + "\n<style>" + cssContent + "</style>";

      setHtmlCode(fullCode);
    }
  }, [isOpen, editor]);

  const handleChange = (val: string) => {
    setHtmlCode(val);
    handleEditorChange(val); // Synchronize changes back to the editor/canvas
  };

  // Import code functionality
  const importCode = () => {
    if (htmlCode && editor) {
      editor.setComponents(htmlCode);
      onClose(); // Close the dialog after importing
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[65vh] max-w-[850px] w-[90%] px-6 py-4 bg-white rounded-lg shadow-xl">
        <DialogTitle className="text-xl leading-6">Import Template</DialogTitle>
        <DialogDescription className="font-normal text-sm text-gray-400">
          Paste your HTML/CSS below and click "Import" to load it into the
          editor.
        </DialogDescription>

        {/* CodeMirror Editor */}
        <div className="mt-4">
          <CodeMirror
            ref={editorRef}
            height="390px"
            theme="dark"
            value={htmlCode}
            extensions={[...languageExtensions, EditorView.lineWrapping]}
            onChange={handleChange}
          />
        </div>

        {/* Import Button */}
        <div className="mt-4 flex justify-end">
          <Button
            onClick={importCode}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Import
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportCodeDialog;
