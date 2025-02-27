import {
  DeviceManagerConfig,
  Editor,
  LayerManagerConfig,
  PanelsConfig,
  SelectorManagerConfig,
  StyleManagerConfig,
  TraitManagerConfig,
} from "grapesjs";

export const styleManager: StyleManagerConfig = {
  appendTo: "#styles-container",
  sectors: [
    {
      name: "Dimension",
      open: false,
      buildProps: [
        "width",
        "max-width",
        "min-width",
        "height",
        "max-height",
        "min-height",
        "margin",
        "padding",
      ],
      properties: [
        {
          type: "integer",
          name: "Width",
          property: "width",
          units: ["px", "%"],
          defaults: "auto",
          min: 0,
        },
        {
          property: "margin",
          properties: [
            { name: "Top", property: "margin-top" },
            { name: "Right", property: "margin-right" },
            { name: "Bottom", property: "margin-bottom" },
            { name: "Left", property: "margin-left" },
          ],
        },
        {
          property: "padding",
          properties: [
            { name: "Top", property: "padding-top" },
            { name: "Right", property: "padding-right" },
            { name: "Bottom", property: "padding-bottom" },
            { name: "Left", property: "padding-left" },
          ],
        },
      ],
    },
    {
      name: "Typography",
      open: false,
      buildProps: [
        "font-family",
        "font-size",
        "font-weight",
        "letter-spacing",
        "color",
        "line-height",
        "text-align",
        "text-decoration",
        "text-shadow",
      ],
      properties: [
        { name: "Font", property: "font-family" },
        { name: "Weight", property: "font-weight" },
        { name: "Font color", property: "color" },
        {
          property: "text-align",
          type: "radio",
          defaults: "left",
          list: [
            { id: "left", value: "left", name: "Left" },
            {
              id: "center",
              value: "center",
              name: "Center",
              className: "fa fa-align-center",
            },
            {
              id: "right",
              value: "right",
              name: "Right",
              className: "fa fa-align-right",
            },
            {
              id: "justify",
              value: "justify",
              name: "Justify",
              className: "fa fa-align-justify",
            },
          ],
        },
        {
          property: "text-decoration",
          type: "radio",
          defaults: "none",
          list: [
            { id: "none", value: "none", name: "None" },
            {
              id: "underline",
              value: "underline",
              name: "underline",
              className: "fa fa-underline",
            },
            {
              id: "line-through",
              value: "line-through",
              name: "Line-through",
              className: "fa fa-strikethrough",
            },
          ],
        },
        {
          property: "text-shadow",
          properties: [
            { name: "X position", property: "text-shadow-h" },
            { name: "Y position", property: "text-shadow-v" },
            { name: "Blur", property: "text-shadow-blur" },
            { name: "Color", property: "text-shadow-color" },
          ],
        },
      ],
    },
    {
      name: "Decorations",
      open: false,
      buildProps: [
        "opacity",
        "border-radius",
        "border",
        "box-shadow",
        "background-bg",
      ],
      properties: [
        {
          type: "slider",
          property: "opacity",
          step: 0.01,
          max: 1,
          min: 0,
        },
        {
          property: "border-radius",
          properties: [
            { name: "Top", property: "border-top-left-radius" },
            { name: "Right", property: "border-top-right-radius" },
            { name: "Bottom", property: "border-bottom-left-radius" },
            { name: "Left", property: "border-bottom-right-radius" },
          ],
        },
        {
          property: "box-shadow",
          properties: [
            { name: "X position", property: "box-shadow-h" },
            { name: "Y position", property: "box-shadow-v" },
            { name: "Blur", property: "box-shadow-blur" },
            { name: "Spread", property: "box-shadow-spread" },
            { name: "Color", property: "box-shadow-color" },
            { name: "Shadow type", property: "box-shadow-type" },
          ],
        },
        {
          id: "background-bg",
          property: "background",
          type: "bg",
        },
      ],
    },
    {
      name: "Extra",
      open: false,
      buildProps: ["transition", "perspective", "transform"],
      properties: [
        {
          property: "transition",
          properties: [
            { name: "Property", property: "transition-property" },
            { name: "Duration", property: "transition-duration" },
            { name: "Easing", property: "transition-timing-function" },
          ],
        },
        {
          property: "transform",
          properties: [
            { name: "Rotate X", property: "transform-rotate-x" },
            { name: "Rotate Y", property: "transform-rotate-y" },
            { name: "Rotate Z", property: "transform-rotate-z" },
            { name: "Scale X", property: "transform-scale-x" },
            { name: "Scale Y", property: "transform-scale-y" },
            { name: "Scale Z", property: "transform-scale-z" },
          ],
        },
      ],
    },
    {
      name: "Flex",
      open: false,
      properties: [
        {
          name: "Flex Container",
          property: "display",
          type: "select",
          defaults: "block",
          list: [
            { id: "block", value: "block", name: "Disable" },
            { id: "flex", value: "flex", name: "Enable" },
          ],
        },
        {
          name: "Flex Parent",
          property: "label-parent-flex",
          type: "integer",
        },
        {
          name: "Direction",
          property: "flex-direction",
          type: "radio",
          defaults: "row",
          list: [
            {
              id: "row",
              value: "row",
              name: "Row",
              className: "icons-flex icon-dir-row",
              title: "Row",
            },
            {
              id: "row-reverse",
              value: "row-reverse",
              name: "Row reverse",
              className: "icons-flex icon-dir-row-rev",
              title: "Row reverse",
            },
            {
              id: "column",
              value: "column",
              name: "Column",
              title: "Column",
              className: "icons-flex icon-dir-col",
            },
            {
              id: "column-reverse",
              value: "column-reverse",
              name: "Column reverse",
              title: "Column reverse",
              className: "icons-flex icon-dir-col-rev",
            },
          ],
        },
        {
          name: "Justify",
          property: "justify-content",
          type: "radio",
          defaults: "flex-start",
          list: [
            {
              id: "flex-start",
              value: "flex-start",
              className: "icons-flex icon-just-start",
              title: "Start",
            },
            {
              id: "flex-end",
              value: "flex-end",
              title: "End",
              className: "icons-flex icon-just-end",
            },
            {
              id: "space-between",
              value: "space-between",
              title: "Space between",
              className: "icons-flex icon-just-sp-bet",
            },
            {
              id: "space-around",
              value: "space-around",
              title: "Space around",
              className: "icons-flex icon-just-sp-ar",
            },
            {
              id: "center",
              value: "center",
              title: "Center",
              className: "icons-flex icon-just-sp-cent",
            },
          ],
        },
        {
          name: "Align",
          property: "align-items",
          type: "radio",
          defaults: "center",
          list: [
            {
              id: "flex-start",
              value: "flex-start",
              title: "Start",
              className: "icons-flex icon-al-start",
            },
            {
              id: "flex-end",
              value: "flex-end",
              title: "End",
              className: "icons-flex icon-al-end",
            },
            {
              id: "stretch",
              value: "stretch",
              title: "Stretch",
              className: "icons-flex icon-al-str",
            },
            {
              id: "center",
              value: "center",
              title: "Center",
              className: "icons-flex icon-al-center",
            },
          ],
        },
        {
          name: "Flex Children",
          property: "label-parent-flex",
          type: "integer",
        },
        {
          name: "Order",
          property: "order",
          type: "integer",
          min: 0,
        },
        {
          name: "Flex",
          property: "flex",
          type: "composite",
          properties: [
            {
              name: "Grow",
              property: "flex-grow",
              type: "integer",
              min: 0,
            },
            {
              name: "Shrink",
              property: "flex-shrink",
              type: "integer",
              min: 0,
            },
            {
              name: "Basis",
              property: "flex-basis",
              type: "integer",
              units: ["px", "%", ""],
              unit: "",
              defaults: "auto",
            },
          ],
        },
        {
          name: "Align",
          property: "align-self",
          type: "radio",
          defaults: "auto",
          list: [
            {
              id: "auto",
              value: "auto",
              name: "Auto",
            },
            {
              id: "flex-start",
              value: "flex-start",
              title: "Start",
              className: "icons-flex icon-al-start",
            },
            {
              id: "flex-end",
              value: "flex-end",
              title: "End",
              className: "icons-flex icon-al-end",
            },
            {
              id: "stretch",
              value: "stretch",
              title: "Stretch",
              className: "icons-flex icon-al-str",
            },
            {
              id: "center",
              value: "center",
              title: "Center",
              className: "icons-flex icon-al-center",
            },
          ],
        },
      ],
    },
  ],
};

export const layerManager: LayerManagerConfig = {
  appendTo: "#layers-container",
};

export const traitManager: TraitManagerConfig = {
  appendTo: "#traits-container",
};

export const selectorManager: SelectorManagerConfig = {
  appendTo: "#styles-container",
};

export const panels: PanelsConfig = {
  defaults: [
    {
      id: "basic-actions",
      el: ".panel__basic-actions",
      buttons: [
        {
          id: "visibility",
          active: true, // active by default
          className: "btn-toggle-borders",
          label: '<i class="fa fa-clone"></i>',
          command: "sw-visibility", // Built-in command
        },
      ],
    },
    {
      id: "editor-actions",
      el: ".panel__editor",
      buttons: [
        {
          id: "saveDb",
          className: "fa fa-paper-plane btn-save",
          command: "saveDb",
        },
        {
          id: "cmd-clear",
          className: "fa fa-trash",
          command: "cmd-clear",
        },
        {
          id: "undo",
          className: "fa fa-undo",
          command: "undo",
        },
        {
          id: "redo",
          className: "fa fa-repeat",
          command: "redo",
        },
        {
          id: "export",
          className: "fa fa-download",
          command: "export",
        },
        {
          id: "preview",
          className: "fa fa-eye",
          command: "preview",
        },
      ],
    },
    {
      id: "panel-devices",
      el: ".panel__devices",
      buttons: [
        {
          id: "device-desktop",
          label: '<i class="fa fa-television"></i>',
          command: "set-device-desktop",
          active: true,
          togglable: false,
        },
        {
          id: "device-mobile",
          label: '<i class="fa fa-mobile"></i>',
          command: "set-device-mobile",
          togglable: false,
        },
      ],
    },
  ],
};

export const deviceManager: DeviceManagerConfig = {
  devices: [
    { id: "desktop", name: "Desktop", width: "1024px" },
    { id: "tablet", name: "Tablet", width: "690px" },
    { id: "mobile", name: "Mobile", width: "320px" },
  ],
};

export const addEditorCommand = (editor: Editor) => {
  // Commands
  editor.Devices.add({ id: "desktop", name: "Desktop", width: "1024px" });
  editor.Devices.add({ id: "tablet", name: "Tablet", width: "690px" });
  editor.Devices.add({ id: "mobile", name: "Mobile", width: "320px" });

  // Save Button
  editor.Commands.add("saveDb", {
    run: (editor, sender) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      sender && sender.set("active");
      editor.store();
    },
  });

  //Clear Button
  editor.Commands.add("cmd-clear", {
    run: (editor) => {
      editor.DomComponents.clear();
      editor.CssComposer.clear();
    },
  });

  //Undo
  editor.Commands.add("undo", {
    run: (editor) => editor.UndoManager.undo(),
  });

  // Redo
  editor.Commands.add("redo", {
    run: (editor) => editor.UndoManager.redo(),
  });

  editor.Components.addType("video", {
    extend: "video",
    model: {
      defaults: {
        traits: [
          {
            type: "file",
            label: "Upload Video",
            name: "video-file",
            changeProp: true,
          },
        ],
        script: function () {
          const videoTag = this.querySelector("video");
          const file = "{[ video-file ]}";

          // Remove existing video content
          this.innerHTML = "";

          if (file) {
            // ✅ Handle Local Video Upload
            const videoElement = document.createElement("video");
            videoElement.src = file;
            videoElement.width = 100;
            videoElement.controls = true;
            this.appendChild(videoElement);
          } else {
            // ✅ Default video display
            this.appendChild(videoTag);
          }
        },
      },

      init() {
        this.on("change:youtube-url change:video-file", this.updateScript);
      },

      updateScript() {
        this.trigger("change:script");
      },
    },
  });
};
