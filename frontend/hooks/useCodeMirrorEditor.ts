"use client";

import { useEffect } from "react";
import { EditorView } from "@codemirror/view";
import { Editor } from "grapesjs";

export const useCodeMirrorEditor = (
  htmlCode: string,
  editor: Editor | null,
  editorRef: React.RefObject<EditorView | null>
) => {
  useEffect(() => {
    // Sync the editor code with GrapesJS canvas content
    if (editor && editorRef.current instanceof EditorView) {
      const htmlContent = editor.getHtml();
      const cssContent = editor.getCss();

      const fullCode = htmlContent + "\n<style>" + cssContent + "</style>";

      if (editorRef.current.state.doc.toString() !== fullCode) {
        editorRef.current.dispatch({
          changes: {
            from: 0,
            to: editorRef.current.state.doc.length,
            insert: fullCode,
          },
        });
      }
    }
  }, [htmlCode, editor, editorRef]);

  // This hook will sync any change in the CodeMirror editor back to the GrapesJS canvas
  const handleEditorChange = (value: string) => {
    if (editor) {
      editor.setComponents(value); // Update the canvas with the new HTML
    }
  };

  return { handleEditorChange };
};
