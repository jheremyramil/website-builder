import { create } from "zustand";
import { Editor } from "grapesjs";

interface EditorState {
  editor: Editor | null;
  editorRef: React.RefObject<HTMLDivElement>;
  templateId: string | null;
  assets: (string | Record<string, unknown>)[];
  setEditor: (editor: Editor) => void;
  setTemplateId: (id: string) => void;
  setAssets: (assets: (string | Record<string, unknown>)[]) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  editorRef: { current: null },
  templateId: null,
  assets: [],
  setEditor: (editor) => set({ editor }),
  setTemplateId: (id) => set({ templateId: id }),
  setAssets: (assets) => set({ assets }),
}));
