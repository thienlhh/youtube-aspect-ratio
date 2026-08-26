import {
  ASPECT_RATIO_OPTIONS,
  DEFAULT_OPTION,
  STATIC_CSS,
} from "./constants";
import { AspectRatioOption } from "./types";
import { generateTransformCss } from "./utils";

/**
 * Creates SVG icon using standard DOM createElementNS to avoid innerHTML.
 */
function createAspectRatioIconSvg(): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("height", "100%");
  svg.setAttribute("version", "1.1");
  svg.setAttribute("viewBox", "0 0 36 36");
  svg.setAttribute("width", "100%");
  svg.setAttribute("aria-hidden", "true");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("class", "ytp-svg-fill");
  path.setAttribute(
    "d",
    "M 7,11 C 5.9,11 5,11.9 5,13 L 5,23 C 5,24.1 5.9,25 7,25 L 29,25 C 30.1,25 31,24.1 31,23 L 31,13 C 31,11.9 30.1,11 29,11 Z M 29.2,22.8 L 6.8,22.8 C 6.5,22.8 6.3,22.6 6.3,22.3 L 6.3,13.7 C 6.3,13.4 6.5,13.2 6.8,13.2 L 29.2,13.2 C 29.5,13.2 29.7,13.4 29.7,13.7 L 29.7,22.3 C 29.7,22.6 29.5,22.8 29.2,22.8 Z M 12,18 L 15.5,14.5 L 15.5,16.8 L 20.5,16.8 L 20.5,14.5 L 24,18 L 20.5,21.5 L 20.5,19.2 L 15.5,19.2 L 15.5,21.5 Z"
  );
  path.setAttribute("fill", "#ffffff");

  svg.appendChild(path);
  return svg;
}

export class AspectRatioUI {
  private static readonly STATIC_STYLE_ID = "yt-aspect-ratio-static-css";
  private static readonly DYNAMIC_STYLE_ID = "yt-aspect-ratio-dynamic-css";

  private currentOption: AspectRatioOption = DEFAULT_OPTION;
  private button: HTMLButtonElement | null = null;
  private list: HTMLUListElement | null = null;
  private dynamicStyleEl: HTMLStyleElement | null = null;
  private boundMouseLeave: (() => void) | null = null;
  private currentPlayer: Element | null = null;

  constructor() {
    this.injectStaticStyles();
    this.initDynamicStyles();
  }

  private injectStaticStyles(): void {
    if (!document.getElementById(AspectRatioUI.STATIC_STYLE_ID)) {
      const styleEl = document.createElement("style");
      styleEl.id = AspectRatioUI.STATIC_STYLE_ID;
      styleEl.textContent = STATIC_CSS;
      (document.head || document.documentElement).appendChild(styleEl);
    }
  }

  private initDynamicStyles(): void {
    let styleEl = document.getElementById(
      AspectRatioUI.DYNAMIC_STYLE_ID
    ) as HTMLStyleElement | null;

    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = AspectRatioUI.DYNAMIC_STYLE_ID;
      (document.head || document.documentElement).appendChild(styleEl);
    }

    this.dynamicStyleEl = styleEl;
    this.applyTransform(this.currentOption.scale);
  }

  public applyTransform(scaleValue: string): void {
    if (!this.dynamicStyleEl) return;
    this.dynamicStyleEl.textContent = generateTransformCss(scaleValue);
  }

  private updateButtonContent(option: AspectRatioOption): void {
    if (!this.button) return;

    this.button.title = `Aspect Ratio: ${option.label}${
      option.title ? ` (${option.title})` : ""
    }`;
    this.button.setAttribute("data-scale", option.scale);
    this.button.setAttribute("aria-label", `Aspect Ratio: ${option.label}`);
  }

  public selectOption(option: AspectRatioOption): void {
    this.currentOption = option;
    this.updateButtonContent(option);

    if (this.list) {
      const items = this.list.querySelectorAll("li");
      items.forEach((li) => {
        if (li.getAttribute("data-scale") === option.scale) {
          li.classList.add("active");
        } else {
          li.classList.remove("active");
        }
      });
    }

    this.applyTransform(option.scale);
  }

  public hideMenu(): void {
    if (this.list && this.list.style.display !== "none") {
      this.list.style.display = "none";
    }
    if (this.button) {
      this.button.classList.remove("ytp-arc-active");
      this.button.setAttribute("aria-expanded", "false");
    }
  }

  public showMenu(): void {
    if (!this.list || !this.button) return;

    // If YouTube native settings menu is open, dismiss it
    const ytSettingsMenu = document.querySelector(
      ".ytp-settings-menu"
    ) as HTMLElement | null;
    if (ytSettingsMenu && getComputedStyle(ytSettingsMenu).display !== "none") {
      const chromeControls = document.querySelector(".ytp-chrome-controls");
      if (chromeControls) {
        chromeControls.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }
    }

    // Align dropdown menu horizontally above the button
    const player = this.button.closest(".html5-video-player") || document.querySelector("#movie_player");
    if (player) {
      const buttonRect = this.button.getBoundingClientRect();
      const playerRect = player.getBoundingClientRect();
      const rightOffset = Math.max(12, playerRect.right - buttonRect.right);
      this.list.style.right = `${rightOffset}px`;
    }

    this.list.style.display = "block";
    this.button.classList.add("ytp-arc-active");
    this.button.setAttribute("aria-expanded", "true");
  }

  public toggleMenu(): void {
    if (!this.list) return;
    if (this.list.style.display === "block") {
      this.hideMenu();
    } else {
      this.showMenu();
    }
  }

  public getButton(): HTMLButtonElement {
    if (this.button) {
      return this.button;
    }

    const button = document.createElement("button");
    button.className = "ytp-button ytp-arc-button";
    button.setAttribute("type", "button");
    button.setAttribute("aria-haspopup", "true");
    button.setAttribute("aria-expanded", "false");
    button.appendChild(createAspectRatioIconSvg());

    this.button = button;
    this.updateButtonContent(this.currentOption);

    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleMenu();
    });

    button.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        this.toggleMenu();
      } else if (e.key === "Escape") {
        this.hideMenu();
      }
    });

    return button;
  }

  public getList(): HTMLUListElement {
    if (this.list) {
      return this.list;
    }

    const list = document.createElement("ul");
    list.className = "ytp-arc-list";
    list.style.display = "none";

    // Prevent clicks inside the dropdown menu (e.g. scrollbar or padding) from closing the menu
    list.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    for (const option of ASPECT_RATIO_OPTIONS) {
      const li = document.createElement("li");
      li.setAttribute("data-scale", option.scale);
      if (option.title) {
        li.title = option.title;
      }
      if (option.scale === this.currentOption.scale) {
        li.classList.add("active");
      }

      const labelSpan = document.createElement("span");
      labelSpan.className = "ytp-arc-item-label";
      labelSpan.textContent = option.label;
      li.appendChild(labelSpan);

      if (option.title) {
        const descSpan = document.createElement("span");
        descSpan.className = "ytp-arc-item-desc";
        descSpan.style.fontSize = "11px";
        descSpan.style.opacity = "0.6";
        descSpan.style.marginLeft = "10px";
        descSpan.textContent = option.title;
        li.appendChild(descSpan);
      }

      li.addEventListener("click", (e) => {
        e.stopPropagation();
        this.selectOption(option);
        this.hideMenu();
      });

      list.appendChild(li);
    }

    this.list = list;

    // Global listeners to dismiss menu
    window.addEventListener("click", () => this.hideMenu());
    window.addEventListener("blur", () => this.hideMenu());
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.hideMenu();
    });

    return list;
  }

  public mount(rightControls: HTMLElement): void {
    const button = this.getButton();
    const list = this.getList();

    // Check if the button is already in the target container
    if (rightControls.contains(button)) {
      return;
    }

    // Insert inside right controls pill container:
    // Try to place before settings, size, or fullscreen button
    const settingsBtn = rightControls.querySelector(".ytp-settings-button");
    const sizeBtn = rightControls.querySelector(".ytp-size-button");
    const fullscreenBtn = rightControls.querySelector(".ytp-fullscreen-button");

    const targetSibling = sizeBtn || fullscreenBtn || settingsBtn;
    if (targetSibling && targetSibling.parentElement === rightControls) {
      rightControls.insertBefore(button, targetSibling);
    } else {
      rightControls.appendChild(button);
    }

    // Attach dropdown list to player container so it doesn't get clipped by right-controls
    const player =
      rightControls.closest(".html5-video-player") ||
      document.querySelector("#movie_player") ||
      document.body;

    if (!player.contains(list)) {
      player.appendChild(list);
    }

    // Ensure player mouseleave listener is attached once and cleaned up if player changes
    if (this.currentPlayer !== player) {
      if (this.currentPlayer && this.boundMouseLeave) {
        this.currentPlayer.removeEventListener("mouseleave", this.boundMouseLeave);
      }
      this.boundMouseLeave = () => this.hideMenu();
      player.addEventListener("mouseleave", this.boundMouseLeave);
      this.currentPlayer = player;
    }
  }
}
