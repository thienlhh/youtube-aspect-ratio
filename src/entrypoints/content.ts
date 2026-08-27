import { AspectRatioUI } from "../ui";

export default defineContentScript({
  matches: ["*://www.youtube.com/*", "*://youtube.com/*"],
  allFrames: true,
  runAt: "document_end",
  main(ctx) {
    let uiInstance: AspectRatioUI | null = null;
    let observer: MutationObserver | null = null;

    function getUI(): AspectRatioUI {
      if (!uiInstance) {
        uiInstance = new AspectRatioUI();
      }
      return uiInstance;
    }

    function findRightControls(): HTMLElement | null {
      return (
        document.querySelector<HTMLElement>(
          "#movie_player .ytp-right-controls, .html5-video-player .ytp-right-controls, .ytp-right-controls"
        ) ??
        document.querySelector<HTMLElement>(
          ".ytp-settings-button, .ytp-size-button, .ytp-fullscreen-button, .ytp-miniplayer-button"
        )?.parentElement ??
        document.querySelector<HTMLElement>(".ytp-chrome-controls")
      );
    }

    function mountControls(): boolean {
      const rightControls = findRightControls();
      if (!rightControls) {
        return false;
      }

      const ui = getUI();
      ui.mount(rightControls);
      return true;
    }

    function tryMount(): void {
      if (mountControls()) {
        return;
      }

      let attempts = 0;
      const maxAttempts = 30;
      const interval = window.setInterval(() => {
        attempts++;
        if (mountControls() || attempts >= maxAttempts) {
          window.clearInterval(interval);
        }
      }, 200);
    }

    let isScheduled = false;
    function scheduleMountCheck(): void {
      if (isScheduled) return;
      isScheduled = true;
      requestAnimationFrame(() => {
        isScheduled = false;
        // Fast path: skip DOM traversal if button is already active in the document
        if (uiInstance?.isMounted()) {
          return;
        }
        const rightControls = findRightControls();
        if (rightControls && !rightControls.querySelector(".ytp-arc-button")) {
          mountControls();
        }
      });
    }

    function setupObserver(): void {
      if (observer) {
        return;
      }

      observer = new MutationObserver(() => {
        scheduleMountCheck();
      });

      const target =
        document.querySelector("#movie_player, .html5-video-player, ytd-app") ||
        document.body;
      if (target) {
        observer.observe(target, {
          childList: true,
          subtree: true,
        });
      }
    }

    function init(): void {
      tryMount();
      setupObserver();
    }

    // Lifecycle listeners
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
      init();
    }

    window.addEventListener("load", tryMount);
    window.addEventListener("yt-navigate-finish", tryMount);
    window.addEventListener("yt-navigate-start", tryMount);
    window.addEventListener("yt-page-data-updated", tryMount);

    ctx.onInvalidated(() => {
      observer?.disconnect();
      observer = null;
    });
  },
});
