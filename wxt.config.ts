import { defineConfig } from "wxt";

export default defineConfig({
  srcDir: "src",
  manifest: {
    name: "Aspect Ratio Changer for YouTube™",
    description:
      "Change the aspect ratio, zoom, and stretch settings of YouTube videos directly from the video player controls.",
    icons: {
      16: "icons/icon16.png",
      32: "icons/icon32.png",
      36: "icons/icon36.png",
      48: "icons/icon48.png",
      64: "icons/icon64.png",
      96: "icons/icon96.png",
      128: "icons/icon128.png",
    },
  },
});
