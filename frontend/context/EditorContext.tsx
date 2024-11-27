import { initGrapesJSEditor } from "@/types";
import { Editor } from "grapesjs";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface EditorContextProps {
  editor: Editor | null;
  editorRef: React.RefObject<HTMLDivElement>;
}

const EditorContext = createContext<EditorContextProps | undefined>(undefined);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
};

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const instance = initGrapesJSEditor(editorRef.current);
      setEditor(instance);

      return () => {
        instance.destroy();
      };
    }
  }, []);

  return (
    <EditorContext.Provider value={{ editor, editorRef }}>
      {children}
    </EditorContext.Provider>
  );
};
