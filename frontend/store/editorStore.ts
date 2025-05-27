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
  isBlocksVisible: boolean;
  toggleBlocks: () => void;
  setBlocksVisible: (visible: boolean) => void;
  isRightSidebarVisible: boolean;
  toggleRightSidebarVisible: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  editorRef: { current: null },
  templateId: null,
  assets: [],
  setEditor: (editor) => set({ editor }),
  setTemplateId: (id) => set({ templateId: id }),
  setAssets: (assets) => set({ assets }),
  isBlocksVisible: false,
  toggleBlocks: () =>
    set((state) => ({ isBlocksVisible: !state.isBlocksVisible })),
  setBlocksVisible: (visible) => set({ isBlocksVisible: visible }),
  isRightSidebarVisible: false,
  toggleRightSidebarVisible: () =>
    set((state) => ({
      isRightSidebarVisible: !state.isRightSidebarVisible,
    })),
}));
