import { useEditorStore } from "@/store";

const Editor = () => {
  const { editorRef } = useEditorStore();
  return <div ref={editorRef} id="editor" />;
};

export default Editor;
