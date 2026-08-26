import { AspectRatioOption } from "./types";

export const ASPECT_RATIO_OPTIONS: readonly AspectRatioOption[] = [
  { label: "70% H", scale: ".703,1", title: "Stretch 16:9 to 5:4" },
  { label: "75% H", scale: ".75,1", title: "Stretch 16:9 to 4:3" },
  { label: "75% V", scale: "1,.75", title: "Stretch 16:9 to 21:9" },
  { label: "85% H", scale: ".85,1", title: "Scale horizontally to 85%" },
  { label: "85% V", scale: "1,.85", title: "Scale vertically to 85%" },
  { label: "93% H", scale: ".937,1", title: "Stretch 4:3 to 5:4" },
  { label: "100%", scale: "1", title: "Original AR" },
  { label: "104%", scale: "1.04", title: "Take WSS out of the picture" },
  { label: "106% H", scale: "1.066,1", title: "Stretch 5:4 to 4:3" },
  { label: "111%", scale: "1.111", title: "Zoom 16:10 to 16:9" },
  { label: "111% V", scale: "1,1.111", title: "Stretch 16:9 to 16:10" },
  { label: "114%", scale: "1.142", title: "Zoom 14:9 to 16:9" },
  { label: "116%", scale: "1.166", title: "Zoom 4:3 to 14:9" },
  { label: "125%", scale: "1.25", title: "Zoom 125%" },
  { label: "125% V", scale: "1,1.25", title: "Stretch vertically to 125%" },
  { label: "133%", scale: "1.333", title: "Zoom 4:3 to 16:9, 21:9 to 16:9" },
  { label: "133% H", scale: "1.333,1", title: "Stretch 4:3 to 16:9, 16:9 to 21:9" },
  { label: "133% V", scale: "1,1.333", title: "Stretch 21:9 to 16:9, 16:9 to 4:3" },
  { label: "142%", scale: "1.422", title: "Zoom 5:4 to 16:9" },
  { label: "142% H", scale: "1.422,1", title: "Stretch 5:4 to 16:9" },
  { label: "142% V", scale: "1,1.422", title: "Stretch 16:9 to 5:4" },
] as const;

export const DEFAULT_OPTION = ASPECT_RATIO_OPTIONS.find((opt) => opt.scale === "1")!;

export const ASPECT_RATIO_ICON_SVG =
  '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%" aria-hidden="true"><path class="ytp-svg-fill" d="M 7,11 C 5.9,11 5,11.9 5,13 L 5,23 C 5,24.1 5.9,25 7,25 L 29,25 C 30.1,25 31,24.1 31,23 L 31,13 C 31,11.9 30.1,11 29,11 Z M 29.2,22.8 L 6.8,22.8 C 6.5,22.8 6.3,22.6 6.3,22.3 L 6.3,13.7 C 6.3,13.4 6.5,13.2 6.8,13.2 L 29.2,13.2 C 29.5,13.2 29.7,13.4 29.7,13.7 L 29.7,22.3 C 29.7,22.6 29.5,22.8 29.2,22.8 Z M 12,18 L 15.5,14.5 L 15.5,16.8 L 20.5,16.8 L 20.5,14.5 L 24,18 L 20.5,21.5 L 20.5,19.2 L 15.5,19.2 L 15.5,21.5 Z" fill="#ffffff"></path></svg>';

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
