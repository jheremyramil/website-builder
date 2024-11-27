import { useEditor } from "@/context/EditorContext";

const Editor = () => {
  const { editorRef } = useEditor();
  return <div ref={editorRef} id="editor-container" />;
};

export default Editor;
