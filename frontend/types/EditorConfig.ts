"use client";

import {
  addEditorCommand,
  layerManager,
  panels,
  selectorManager,
  styleManager,
} from "@/lib";
import axios from "axios";
import grapesjs, { ProjectData } from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import gjsPresetNavbar from "grapesjs-navbar";
import gjsPluginExport from "grapesjs-plugin-export";
import gjsPresetForms from "grapesjs-plugin-forms";
import gjsStyleBG from "grapesjs-style-bg";
import gjsPresetTooltip from "grapesjs-tooltip";
import "grapesjs/dist/css/grapes.min.css";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

const initGrapesJSEditor = (
  container: HTMLElement,
  templateId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assets: (string | Record<string, any>)[]
) => {
  const editor = grapesjs.init({
    container,
    blockManager: {
      appendTo: "#blocks",
    },
    styleManager: styleManager,
    layerManager: layerManager,
    selectorManager: selectorManager,
    panels: panels,
    storageManager: {
      type: "remote",
      stepsBeforeSave: 3,
      options: {
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
        remote: {
          contentTypeJson: true,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      },
    },
    width: "100%",
    height: "100vh",
    plugins: [
      gjsBlockBasic,
      gjsPluginExport,
      gjsStyleBG,
      gjsPresetNavbar,
      gjsPresetForms,
      gjsPresetTooltip,
    ],
    pluginsOpts: {
      gjsBlockBasic: {},
      gjsPluginExport: {},
      gjsStyleBG: {},
      gjsPresetNavbar: {},
      gjsPresetForms: {},
      gjsPresetTooltip: {},
    },
  });

  addEditorCommand(editor);

  if (assets) {
    editor.AssetManager.add(assets);
  }

  editor.Storage.add("remote", {
    async load(): Promise<ProjectData> {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/page/${templateId}/content`
        );

        const { pages, styles, assets } = response.data;

        if (!pages) {
          return initializeEditorWithDefaultData();
        }

        const projectData = { pages, styles, assets };
        editor.loadProjectData({ pages, styles, assets });

        return projectData;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error?.message || "An unexpected error occurred.");
        return initializeEditorWithDefaultData();
      }
    },

    async store(data) {
      const response = await axios.post(
        `${API_BASE_URL}/page/${templateId}/content`,
        data
      );

      const { content } = response.data;
      return content;
    },
  });

  function initializeEditorWithDefaultData() {
    const defaultData = {
      pages: [
        {
          component: `
            <div class="test">Hello World!</div>
            <style>
              .test {
                color: #444;
                font-size: 2rem;
                font-weight: medium;
              }
            </style>
          `,
        },
      ],
    };

    const { component } = defaultData.pages[0];
    editor.setComponents(component);
    return defaultData;
  }

  return editor;
};

export default initGrapesJSEditor;
