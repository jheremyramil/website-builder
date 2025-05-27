import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper to extract raw HTML content
export const extractComponents = (data: any) => {
  // Extract components from the first page's first frame
  const page = data?.pages?.[0];
  if (page && page.frames && page.frames.length > 0) {
    const components = page.frames[0].component?.components;
    return components || [];
  }
  return [];
};

// Render component recursively into HTML
export const renderComponentAsHTML = (component: any): string => {
  if (!component) return "";

  const tag = component.tagName || "div";
  const attributes = component.attributes
    ? Object.entries(component.attributes)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ")
    : "";

  const children = (component.components || [])
    .map((child: any) => renderComponentAsHTML(child))
    .join("");

  const content =
    component.type === "text" ? component.content || "" : children;

  return `<${tag} ${attributes}>${content}</${tag}>`;
};

// Helper to convert styles to raw CSS
export const extractCSS = (styles: any[]): string => {
  if (!styles || styles.length === 0) return "";

  return styles
    .map((style) => {
      const selectors = (style.selectors || [])
        .map((sel: any) => (sel.name ? `.${sel.name}` : sel))
        .join(", ");
      const rules = Object.entries(style.style || {})
        .map(([key, value]) => `${key}: ${value};`)
        .join(" ");
      const media = style.mediaText
        ? `@media ${style.mediaText} { ${selectors} { ${rules} } }`
        : `${selectors} { ${rules} }`;

      return media;
    })
    .join("\n");
};

/**
 * Converts a YouTube video URL into an embeddable URL format.
 * @param {string} url - The YouTube video URL.
 * @returns {string | null} - The embeddable YouTube URL or null if invalid.
 */
export const getYouTubeEmbedUrl = (url: string): string | null => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|.*[?&]v=))([^"&?\/\s]{11})/
  );

  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }

  return null;
};
