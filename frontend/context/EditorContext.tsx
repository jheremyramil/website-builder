import initGrapesJSEditor from "@/types/EditorConfig";
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
  templateId?: string | null;
  assets?: (string | Record<string, any>)[];
}

const EditorContext = createContext<EditorContextProps | undefined>(undefined);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
};

export const EditorProvider: React.FC<{
  children: React.ReactNode;
  templateId?: string;
  assets?: (string | Record<string, any>)[];
}> = ({ children, templateId = "", assets = [] }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const instance = initGrapesJSEditor(
        editorRef.current,
        templateId,
        assets
      );

      if (instance) {
        setEditor(instance);
      }

      return () => {
        instance?.destroy();
      };
    }
  }, [templateId]);

  return (
    <EditorContext.Provider value={{ editor, editorRef }}>
      {children}
    </EditorContext.Provider>
  );
};
