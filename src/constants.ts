import type { AspectRatioOption } from "./types";

export const ASPECT_RATIO_OPTIONS: readonly AspectRatioOption[] = Object.freeze([
  Object.freeze({ label: "70% H", scale: ".703,1", title: "Stretch 16:9 to 5:4" }),
  Object.freeze({ label: "75% H", scale: ".75,1", title: "Stretch 16:9 to 4:3" }),
  Object.freeze({ label: "75% V", scale: "1,.75", title: "Stretch 16:9 to 21:9" }),
  Object.freeze({ label: "85% H", scale: ".85,1", title: "Scale horizontally to 85%" }),
  Object.freeze({ label: "85% V", scale: "1,.85", title: "Scale vertically to 85%" }),
  Object.freeze({ label: "93% H", scale: ".937,1", title: "Stretch 4:3 to 5:4" }),
  Object.freeze({ label: "100%", scale: "1", title: "Original" }),
  Object.freeze({ label: "104%", scale: "1.04", title: "Take WSS out of the picture" }),
  Object.freeze({ label: "106% H", scale: "1.066,1", title: "Stretch 5:4 to 4:3" }),
  Object.freeze({ label: "111%", scale: "1.111", title: "Zoom 16:10 to 16:9" }),
  Object.freeze({ label: "111% V", scale: "1,1.111", title: "Stretch 16:9 to 16:10" }),
  Object.freeze({ label: "114%", scale: "1.142", title: "Zoom 14:9 to 16:9" }),
  Object.freeze({ label: "116%", scale: "1.166", title: "Zoom 4:3 to 14:9" }),
  Object.freeze({ label: "125%", scale: "1.25", title: "Zoom 125%" }),
  Object.freeze({ label: "125% V", scale: "1,1.25", title: "Stretch vertically to 125%" }),
  Object.freeze({ label: "133%", scale: "1.333", title: "Zoom 4:3 to 16:9, 21:9 to 16:9" }),
  Object.freeze({ label: "133% H", scale: "1.333,1", title: "Stretch 4:3 to 16:9, 16:9 to 21:9" }),
  Object.freeze({ label: "133% V", scale: "1,1.333", title: "Stretch 21:9 to 16:9, 16:9 to 4:3" }),
  Object.freeze({ label: "142%", scale: "1.422", title: "Zoom 5:4 to 16:9" }),
  Object.freeze({ label: "142% H", scale: "1.422,1", title: "Stretch 5:4 to 16:9" }),
  Object.freeze({ label: "142% V", scale: "1,1.422", title: "Stretch 16:9 to 5:4" }),
] as const);

export const DEFAULT_OPTION = Object.freeze(
  ASPECT_RATIO_OPTIONS.find((opt) => opt.scale === "1")!
);

export const STATIC_CSS = `
.ytp-button.ytp-arc-button {
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  background: transparent !important;
  outline: none !important;
  cursor: pointer;
  display: inline-block !important;
  vertical-align: top !important;
  box-sizing: border-box !important;
  flex-shrink: 0 !important;
  text-align: center;
  line-height: 0 !important;
  font-size: 0 !important;
}

.ytp-button.ytp-arc-button svg {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  pointer-events: none;
  margin: 0 !important;
  padding: 0 !important;
}

.ytp-button.ytp-arc-button .ytp-svg-fill {
  fill: #ffffff;
}

.html5-video-container, .video-annotations {
  transition-property: transform, top;
  transition-duration: 100ms;
  transition-timing-function: cubic-bezier(1, -0.33, 0, 1.37);
}

.ytp-arc-list {
  position: absolute;
  bottom: 58px;
  right: 12px;
  min-width: 160px;
  max-height: 380px;
  overflow-y: auto;
  overflow-x: hidden;
  background: rgba(28, 28, 28, 0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  list-style-type: none;
  display: none;
  padding: 8px 6px;
  margin: 0;
  user-select: none;
  white-space: nowrap;
  z-index: 2000;
  font-family: "YouTube Noto", Roboto, Arial, Helvetica, sans-serif;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.ytp-arc-list::-webkit-scrollbar {
  width: 4px;
}

.ytp-arc-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.ytp-arc-list > li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.4;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 400;
  color: #eee;
  transition: background-color 0.15s ease, color 0.15s ease;
  margin-bottom: 2px;
}

.ytp-arc-list > li:last-child {
  margin-bottom: 0;
}

.ytp-arc-list > li:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.ytp-arc-list > li.active {
  font-weight: 500;
  color: #3ea6ff;
  background: rgba(62, 166, 255, 0.15);
}

@media (min-height: 980px) and (min-width: 1720px) {
  ytd-watch:not([theater]) .ytp-arc-list,
  ytd-watch-flexy:not([theater]) .ytp-arc-list {
    column-count: 2;
  }
}

@media (max-width: 1279px) {
  .ytp-arc-list {
    column-count: 2;
  }
}

@media (min-width: 857px) and (max-height: 634px) {
  ytd-watch:not([theater]) .ytp-arc-list,
  ytd-watch-flexy:not([theater]) .ytp-arc-list {
    column-count: 2;
  }
}

@media (max-width: 856px) {
  .ytp-fullscreen .ytp-arc-list,
  ytd-watch:not([theater]) .ytp-arc-list,
  ytd-watch-flexy:not([theater]) .ytp-arc-list {
    column-count: 2;
  }
}

@media (max-width: 656px) {
  .ytp-arc-list,
  ytd-watch:not([theater]) .ytp-arc-list,
  ytd-watch-flexy:not([theater]) .ytp-arc-list {
    column-count: 3;
  }
}
`;
