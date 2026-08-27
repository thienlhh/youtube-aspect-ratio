import type { AspectRatioOption } from "./types";

export const ASPECT_RATIO_OPTIONS: readonly AspectRatioOption[] = Object.freeze([
  Object.freeze({ label: "70% H", scale: ".703,1", title: "Horizontal 70%" }),
  Object.freeze({ label: "75% H", scale: ".75,1", title: "Horizontal 75%" }),
  Object.freeze({ label: "75% V", scale: "1,.75", title: "Vertical 75%" }),
  Object.freeze({ label: "85% H", scale: ".85,1", title: "Horizontal 85%" }),
  Object.freeze({ label: "85% V", scale: "1,.85", title: "Vertical 85%" }),
  Object.freeze({ label: "94% H", scale: ".937,1", title: "Horizontal 94%" }),
  Object.freeze({ label: "100%", scale: "1", title: "Original (100%)" }),
  Object.freeze({ label: "104%", scale: "1.04", title: "Zoom 104%" }),
  Object.freeze({ label: "107% H", scale: "1.066,1", title: "Horizontal 107%" }),
  Object.freeze({ label: "111%", scale: "1.111", title: "Zoom 111%" }),
  Object.freeze({ label: "111% V", scale: "1,1.111", title: "Vertical 111%" }),
  Object.freeze({ label: "114%", scale: "1.142", title: "Zoom 114%" }),
  Object.freeze({ label: "117%", scale: "1.166", title: "Zoom 117%" }),
  Object.freeze({ label: "125%", scale: "1.25", title: "Zoom 125%" }),
  Object.freeze({ label: "125% V", scale: "1,1.25", title: "Vertical 125%" }),
  Object.freeze({ label: "133%", scale: "1.333", title: "Zoom 133%" }),
  Object.freeze({ label: "133% H", scale: "1.333,1", title: "Horizontal 133%" }),
  Object.freeze({ label: "133% V", scale: "1,1.333", title: "Vertical 133%" }),
  Object.freeze({ label: "142%", scale: "1.422", title: "Zoom 142%" }),
  Object.freeze({ label: "142% H", scale: "1.422,1", title: "Horizontal 142%" }),
  Object.freeze({ label: "142% V", scale: "1,1.422", title: "Vertical 142%" }),
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
  justify-content: flex-start;
  line-height: 1.4;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 400;
  color: #eee;
  transition: background-color 0.15s ease, color 0.15s ease;
  margin-bottom: 2px;
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
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
