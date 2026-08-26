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
      // 1. Look within main movie player
      const player = document.querySelector(
        "#movie_player, .html5-video-player, ytd-watch-flexy"
      );
      if (player) {
        const rc = player.querySelector(
          ".ytp-right-controls"
        ) as HTMLElement | null;
        if (rc) return rc;
      }

      // 2. Global right-controls
      const rc = document.querySelector(
        ".ytp-right-controls"
      ) as HTMLElement | null;
      if (rc) return rc;

      // 3. Fallback to parent of settings or fullscreen button
      const siblingBtn = document.querySelector(
        ".ytp-settings-button, .ytp-size-button, .ytp-fullscreen-button, .ytp-miniplayer-button"
      );
      if (siblingBtn && siblingBtn.parentElement) {
        return siblingBtn.parentElement as HTMLElement;
      }

      // 4. Fallback to chrome controls
      return document.querySelector(
        ".ytp-chrome-controls"
      ) as HTMLElement | null;
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

    // Lifecycle listeners
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        tryMount();
        setupObserver();
      });
    } else {
      tryMount();
      setupObserver();
    }

    window.addEventListener("load", tryMount);
    window.addEventListener("yt-navigate-finish", tryMount);
    window.addEventListener("yt-navigate-start", tryMount);
    window.addEventListener("yt-page-data-updated", tryMount);
  },
});
