"use client";

import { useEditorStore } from "@/store";
import { useEffect, useRef } from "react";

const Editor = () => {
  const { editorRef } = useEditorStore();

  return (
    <div
      id="gjs"
      ref={editorRef}
      style={{ height: "100vh", width: "100%", overflow: "hidden" }}
    />
  );
};

export default Editor;
