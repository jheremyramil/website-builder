import { useEditorStore } from "@/store";

const Editor = () => {
  const { editorRef } = useEditorStore();
  return <div className="w-full" ref={editorRef} id="editor" />;
};

export default Editor;
