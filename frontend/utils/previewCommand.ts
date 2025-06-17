import { each } from "underscore";

export default function previewCommand(editor) {
  const pfx = editor.getConfig("stylePrefix") || "gjs-";
  let helperEl: HTMLElement | null = null;
  let savedSelection = [];
  let shouldRunSwVisibility = false;

  const cmdOutline = "core:component-outline";

  const preventDrag = (opts: any) => {
    opts.abort = 1;
  };

  const tglEffects = (on: boolean) => {
    const em = editor.getModel();
    const canvas = editor.Canvas;
    const body = canvas.getBody();
    const toolbar = canvas.getToolbarEl();

    if (toolbar) toolbar.style.display = on ? "none" : "";

    const elP = body.querySelectorAll(`.${pfx}no-pointer`);
    each(elP, (item) => {
      (item as HTMLElement).style.pointerEvents = on ? "all" : "";
    });

    em[on ? "on" : "off"]("run:tlb-move:before", preventDrag);
  };

  editor.Commands.add("custom-preview", {
    run(ed) {
      savedSelection = [...ed.getSelectedAll()];
      ed.select();
      shouldRunSwVisibility = ed.Commands.isActive(cmdOutline);

      if (shouldRunSwVisibility) {
        ed.stopCommand(cmdOutline);
      }

      ed.getModel().stopDefault();
      ed.Panels.getPanels().forEach((panel) => panel.set("visible", false));

      const canvasEl = ed.Canvas.getElement();
      Object.assign(canvasEl.style, {
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        padding: "0",
        margin: "0",
      });

      if (!helperEl) {
        helperEl = document.createElement("span");
        helperEl.className = `${pfx}off-prv fa fa-eye-slash`;
        helperEl.style.cursor = "pointer";
        helperEl.style.position = "fixed";
        helperEl.style.top = "10px";
        helperEl.style.right = "10px";
        helperEl.style.zIndex = "9999";
        helperEl.style.fontSize = "20px";
        helperEl.style.color = "#444";
        helperEl.onclick = () => ed.stopCommand("custom-preview");
        ed.getEl().appendChild(helperEl);
      }

      helperEl.style.display = "inline-block";
      tglEffects(true);
      ed.refresh();
    },

    stop(ed) {
      if (shouldRunSwVisibility) {
        ed.runCommand(cmdOutline);
      }

      ed.getModel().runDefault();
      ed.Panels.getPanels().forEach((panel) => panel.set("visible", true));
      ed.Canvas.getElement().setAttribute("style", "");

      if (savedSelection) ed.select(savedSelection);
      if (helperEl) helperEl.style.display = "none";

      tglEffects(false);
      ed.refresh();
    },
  });
}
