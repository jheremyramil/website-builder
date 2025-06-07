import grapesjs from "grapesjs";

export const registerYouTubeVideoComponent = (editor: grapesjs.Editor) => {
  const domc = editor.DomComponents;

  domc.addType("youtube-video", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: false,
        attributes: {
          class: "youtube-video-container",
          "data-gjs-type": "youtube-video",
        },
        style: {
          width: "100%",
          height: "400px",
          "min-height": "200px",
        },
        components: [],
        traits: [
          {
            type: "text",
            label: "YouTube Video ID or URL",
            name: "youtubeUrl",
            placeholder:
              "dQw4w9WgXcQ or https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            changeProp: 1,
          },
          {
            type: "number",
            label: "Width",
            name: "width",
            changeProp: 1,
            placeholder: "560",
          },
          {
            type: "select",
            label: "Width Unit",
            name: "width-unit",
            options: [
              { value: "px", name: "px" },
              { value: "%", name: "%" },
              { value: "em", name: "em" },
              { value: "vw", name: "vw" },
            ],
            default: "px",
            changeProp: 1,
          },
          {
            type: "number",
            label: "Height",
            name: "height",
            changeProp: 1,
            placeholder: "315",
          },
          {
            type: "select",
            label: "Height Unit",
            name: "height-unit",
            options: [
              { value: "px", name: "px" },
              { value: "%", name: "%" },
              { value: "em", name: "em" },
              { value: "vh", name: "vh" },
            ],
            default: "px",
            changeProp: 1,
          },
          {
            type: "checkbox",
            label: "Autoplay",
            name: "autoplay",
            changeProp: 1,
          },
          {
            type: "checkbox",
            label: "Muted",
            name: "muted",
            changeProp: 1,
          },
          {
            type: "checkbox",
            label: "Loop",
            name: "loop",
            changeProp: 1,
          },
          {
            type: "checkbox",
            label: "Show Controls",
            name: "controls",
            valueTrue: "1",
            valueFalse: "0",
            default: true,
            changeProp: 1,
          },
        ],
      },

      init() {
        // Set default values if not already set
        if (!this.get("width")) this.set("width", "560");
        if (!this.get("height")) this.set("height", "315");
        if (!this.has("width-unit")) this.set("width-unit", "px");
        if (!this.has("height-unit")) this.set("height-unit", "px");

        this.on(
          "change:youtubeUrl change:autoplay change:muted change:loop change:controls change:width change:height change:width-unit change:height-unit",
          this.handleUrlChange
        );

        this.handleUrlChange();
      },

      handleUrlChange() {
        const url = this.get("youtubeUrl") || "";
        const videoId = this.extractVideoId(url);
        const autoplay = this.get("autoplay") ? 1 : 0;
        const muted = this.get("muted") ? 1 : 0;
        const loop = this.get("loop") ? 1 : 0;
        const controls = this.get("controls") ? 1 : 0;

        const width = this.get("width") || "560";
        const height = this.get("height") || "315";
        const widthUnit = this.get("width-unit") || "px";
        const heightUnit = this.get("height-unit") || "px";

        // Update container styles
        const styles: Record<string, string> = {
          width: `${width}${widthUnit}`,
          height: `${height}${heightUnit}`,
        };
        this.setStyle(styles);

        // Clear current components
        this.components().reset();

        if (videoId) {
          const params = new URLSearchParams({
            autoplay: autoplay.toString(),
            mute: muted.toString(),
            rel: "0",
            enablejsapi: "1",
            playsinline: "1",
            controls: controls.toString(),
            origin: window.location.origin,
          });

          if (loop) {
            params.append("loop", "1");
            params.append("playlist", videoId);
          }

          const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;

          this.components().add({
            type: "default",
            tagName: "iframe",
            attributes: {
              src: embedUrl,
              frameborder: "0",
              allow:
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
              allowfullscreen: "allowfullscreen",
              "data-video-id": videoId,
              loading: "lazy",
            },
            style: {
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
            },
          });
        } else {
          this.components().add({
            type: "default",
            tagName: "div",
            components: [
              {
                type: "textnode",
                content: "Enter a valid YouTube URL or Video ID",
              },
              { type: "default", tagName: "br" },
              {
                type: "textnode",
                content: "Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ",
              },
            ],
          });
        }
      },

      extractVideoId(url: string): string | null {
        if (!url) return null;
        if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;

        const regExp =
          /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
      },
    },

    view: {
      init() {
        this.listenTo(
          this.model,
          "change:youtubeUrl change:autoplay change:muted change:loop change:width change:height change:controls change:width-unit change:height-unit",
          this.render
        );
      },
    },
  });

  editor.BlockManager.add("youtube-video", {
    label: "YouTube Video",
    category: "Media",
    content: {
      type: "youtube-video",
      youtubeUrl: "dQw4w9WgXcQ",
      autoplay: 0,
      muted: 1,
      loop: 0,
      controls: 1,
      width: 560,
      height: 315,
      "width-unit": "px",
      "height-unit": "px",
    },
    media: `<svg viewBox="0 0 24 24"><path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" /></svg>`,
  });
};
