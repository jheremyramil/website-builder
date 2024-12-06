"use client";

import {
  addEditorCommand,
  layerManager,
  panels,
  selectorManager,
  styleManager,
} from "@/lib";
import axios from "axios";
import grapesjs from "grapesjs";
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
  container: any,
  templateId: string,
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
    assetManager: {
      assets,
      upload: false,
    },
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
  editor.Storage.add("remote", {
    async load() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/page/${templateId}/content`
        );
        const { content } = response.data;

        if (content) {
          const parsedContent = JSON.parse(content)[0];
          const { html, css } = parsedContent;
          editor.setComponents(html);
          editor.setStyle(css);
        } else {
          initializeEditorWithDefaultData();
        }
      } catch (error) {
        console.error("Error loading content:", error);
      }
    },

    async store(data) {
      return await axios.post(
        `${API_BASE_URL}/page/${templateId}/content`,
        data
      );
    },
  });

  const initializeEditorWithDefaultData = () => {
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
  };

  return editor;
};

export default initGrapesJSEditor;
