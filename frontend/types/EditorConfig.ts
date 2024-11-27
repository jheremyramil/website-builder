import grapesjs from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import gjsPresetNavbar from "grapesjs-navbar";
import gjsPluginExport from "grapesjs-plugin-export";
import gjsPresetForms from "grapesjs-plugin-forms";
import gjsStyleBG from "grapesjs-style-bg";
import gjsPresetTooltip from "grapesjs-tooltip";
import "grapesjs/dist/css/grapes.min.css";

export const initGrapesJSEditor = (container: HTMLElement) => {
  const editor = grapesjs.init({
    container,
    storageManager: false,
    deviceManager: {},
    styleManager: {
      appendTo: "#styles-container",
      sectors: [
        {
          name: "Dimension",
          open: false,
          buildProps: ["width", "min-height", "padding"],
          properties: [
            {
              type: "integer",
              name: "Width",
              property: "width",
              units: ["px", "%"],
              defaults: "auto",
              min: 0,
            },
          ],
        },
      ],
    },
    blockManager: {
      appendTo: "#blocks",
    },
    layerManager: {
      appendTo: "#layers-container",
    },
    traitManager: {
      appendTo: "#traits-container",
    },
    selectorManager: {
      appendTo: "#styles-container",
    },
    panels: {
      defaults: [],
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

  // Add custom devices
  editor.Devices.add({ id: "desktop", name: "Desktop", width: "1024px" });
  editor.Devices.add({ id: "tablet", name: "Tablet", width: "690px" });
  editor.Devices.add({ id: "mobile", name: "Mobile", width: "320px" });

  return editor;
};
