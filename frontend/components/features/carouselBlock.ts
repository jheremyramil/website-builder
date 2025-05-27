function registerCustomCarousel(editor) {
  editor.DomComponents.addType("carousel-item-with-bg", {
    model: {
      defaults: {
        name: "Carousel Item",
        draggable: false,
        droppable: false,
        copyable: false,
        badgable: false,
        "data-bg-image":
          "https://via.placeholder.com/800x300?text=Default+Slide",
        traits: [
          {
            type: "text",
            label: "Image URL",
            name: "data-bg-image",
            changeProp: true,
          },
          {
            type: "select",
            label: "Background Size",
            name: "background-size",
            options: [
              { id: "auto", name: "Auto" },
              { id: "cover", name: "Cover" },
              { id: "contain", name: "Contain" },
              { id: "100% 100%", name: "Fill (100% 100%)" },
            ],
            changeProp: true,
          },
          {
            type: "select",
            label: "Background Position",
            name: "background-position",
            options: [
              { id: "center", name: "Center" },
              { id: "top", name: "Top" },
              { id: "bottom", name: "Bottom" },
              { id: "left", name: "Left" },
              { id: "right", name: "Right" },
            ],
            changeProp: true,
          },
        ],
        stylable: [
          "background-size",
          "background-position",
          "height",
          "background-image",
        ],
      },

      init() {
        this.listenTo(
          this,
          "change:data-bg-image",
          this.updateBackgroundImageStyle
        );
        this.listenTo(
          this,
          "change:background-size",
          this.updateBackgroundImageStyle
        );
        this.listenTo(
          this,
          "change:background-position",
          this.updateBackgroundImageStyle
        );
        this.updateBackgroundImageStyle();
      },

      updateBackgroundImageStyle() {
        const styles = {};
        const imageUrl = this.get("data-bg-image");
        const bgSize = this.get("background-size");
        const bgPosition = this.get("background-position");

        styles["background-image"] = imageUrl ? `url('${imageUrl}')` : "";
        styles["background-size"] = bgSize || "cover";
        styles["background-position"] = bgPosition || "center";
        styles["background-repeat"] = bgSize === "contain" ? "no-repeat" : "";

        this.addStyle(styles);
      },
    },

    view: {
      events: {
        dblclick: "onDblClick",
      },
      onDblClick() {
        const editor = this.em.get("Editor");
        if (!editor) return;

        editor.AssetManager.open({
          target: this.model,
          types: ["image"],
          onSelect: (asset) => {
            const imageUrl = asset.get("src");
            this.model.set("data-bg-image", imageUrl);
            editor.AssetManager.close();
          },
        });
      },
    },
  });

  const carouselStyles = `
      <style>
        .carousel-inner {
          position: relative;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
  
        .carousel-item {
          transition: opacity 0.8s ease-in-out;
        }
  
        .carousel-buttons {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          transform: translateY(-50%);
          z-index: 10;
          padding: 0 16px;
        }
  
        .carousel-control-prev,
        .carousel-control-next {
          height: 50px;
          width: 50px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
  
        .carousel-control-prev:hover,
        .carousel-control-next:hover {
          background: rgba(255, 255, 255, 0.25);
        }
  
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          background-size: 100% 100%;
          width: 18px;
          height: 18px;
          filter: invert(1);
        }
      </style>
    `;

  editor.BlockManager.add("custom-carousel", {
    label: "Modern Carousel",
    category: "Custom",
    media:
      '<svg viewBox="0 0 24 24" height="20" width="20"><path d="M8 5v14l11-7z"/></svg>',
    content: () => {
      const uniqueId = `carousel-${Date.now()}`;

      return `
          ${carouselStyles}
          <div id="${uniqueId}" class="carousel slide" data-bs-ride="carousel" style="min-height: 300px;">
            <div class="carousel-inner">
              <div class="carousel-item active"
                  data-gjs-type="carousel-item-with-bg"
                  data-bg-image="https://via.placeholder.com/800x300?text=Slide+1"
                  style="background-image: url('https://via.placeholder.com/800x300?text=Slide+1'); background-size: cover; background-position: center; height: 300px;">
              </div>
              <div class="carousel-item"
                  data-gjs-type="carousel-item-with-bg"
                  data-bg-image="https://via.placeholder.com/800x300?text=Slide+2"
                  style="background-image: url('https://via.placeholder.com/800x300?text=Slide+2'); background-size: cover; background-position: center; height: 300px;">
              </div>
              <div class="carousel-item"
                  data-gjs-type="carousel-item-with-bg"
                  data-bg-image="https://via.placeholder.com/800x300?text=Slide+3"
                  style="background-image: url('https://via.placeholder.com/800x300?text=Slide+3'); background-size: cover; background-position: center; height: 300px;">
              </div>
  
              <div class="carousel-buttons">
                <button class="carousel-control-prev" type="button" data-bs-target="#${uniqueId}" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#${uniqueId}" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>`;
    },
  });
}

export default registerCustomCarousel;
