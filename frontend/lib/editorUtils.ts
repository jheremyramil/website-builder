import {
  Editor,
  LayerManagerConfig,
  PanelsConfig,
  SelectorManagerConfig,
  TraitManagerConfig,
} from "grapesjs";

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

  editor.StyleManager.addSector("flex-container", {
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
  });
};
